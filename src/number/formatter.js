import { getInputDom } from './util/dom'
import { removeItem, cache, setProp } from './util/lang'
import { debug } from './util/log'

const UseCache = true
const ValidOperation = [
  'Backspace',
  'Enter',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown'
]
const AllVailidNumberChar = ['0-9', '+', '-', '\\.', 'e']
const UniqueChar = ['+|-', '\\.', 'e']
const ValidSepChar = [',', ' ']

const UniqueTesters = UniqueChar.map(c => {
  let lastValueRegex = new RegExp(`[${c}]`)
  let newCharRegex = new RegExp(`^[${c}]$`)

  return (newChar, value) => {
    return !lastValueRegex.test(value) || !newCharRegex.test(newChar)
  }
})

function getValue(ev) {
  return ev.target.value
}

function genValidCharRegex({
  positive,
  sientific,
  integer,
  flag,
  minimum,
  maximum,
  precision,
  sep,
  sepChar = []
}) {
  if (sep && !Array.isArray(sepChar)) {
    sepChar = ValidSepChar
  }
  let validChar = [...AllVailidNumberChar, ...sepChar]

  positive && removeItem(validChar, '-')
  !flag && removeItem(validChar, '-')
  !flag && removeItem(validChar, '+')
  !sientific && removeItem(validChar, 'e')
  integer && removeItem(validChar, '\\.')

  return new RegExp(`^${ValidOperation.join('|')}|[${validChar.join('')}]$`)
}

function getMaxIntegerLength({ minimum, maximum, sep, sepChar = [] }) {
  return Math.max(
    parseInt(minimum >= 0 ? minimum : -minimum).toString().length,
    parseInt(maximum >= 0 ? maximum : -maximum).toString().length
  )
}

function getMaxLength(
  integerLength,
  { sientific, integer, flag, minimum, maximum, precision, sep, sepChar = [] }
) {
  flag && integerLength++
  !integer && integerLength++
  precision && (integerLength += precision)

  return integerLength
}

function genValidRegex(
  integerLength,
  { sientific, integer, flag, precision, sep, sepChar = [] }
) {
  let regexStr = `([1-9]?)([0-9]{0,${integerLength - 1}})?`

  flag && (regexStr = '[+-]?' + regexStr)
  !integer && (regexStr += `(\\.{0,1})?(\\.[0-9]{1,${precision}})?`)

  return new RegExp(`^${regexStr}$`)
}

export class Formatter {
  constructor(options) {
    this.input = getInputDom(options.el, options.vnode)
    this.options = options
    this.validCharRegex = genValidCharRegex(options)

    let maxIntegerLength = getMaxIntegerLength(options)
    this.maxLength = getMaxLength(maxIntegerLength, options)
    this.validRegex = genValidRegex(maxIntegerLength, options)

    this.oldValue = this.input.value

    this.initListenMethods()
    this.initValidateMethods()
  }

  initListenMethods() {
    this.onKeydown = function(ev) {
      this.oldValue = this.input.value
      if (!this.validCharRegex.test(ev.key)) {
        debug(`validCharRegex test: ${ev.key}, ${this.validCharRegex}`)
        ev.preventDefault()
      }

      if (UniqueTesters.some(tester => !tester(ev.key, getValue(ev)))) {
        debug(`UniqueTesters: ${ev.key}, ${getValue(ev)}`)
        ev.preventDefault()
      }
    }.bind(this)

    this.validateAndFixInput = this.validateAndFixByInputEvent.bind(this)
    // if (this.options.vnode.componentInstance) {
    //   this.validateAndFixInput = function(ev) {
    //     // console.log(ev)
    //   }.bind(this)
    // } else {
    // }

    this.onPaste = function(ev) {
      ev.preventDefault()
    }.bind(this)

    this.onBlur = function(ev) {
      this.formatValue(getValue(ev))
    }.bind(this)
  }

  initValidateMethods() {
    let validateValue = value => {
      if (value.length > this.maxLength) {
        debug(`maxLength: value:${value}, maxLength:${this.maxLength}`)
        return false
      }
      if (!this.validRegex.test(value)) {
        debug(`validRegex test: value:${value}, validRegex:${this.validRegex}`)
        return false
      }

      return true
    }
    let formatValue = () => {
      // 整体format
    }

    this.validateValue = UseCache
      ? cache(validateValue).bind(this)
      : validateValue
    this.formatValue = UseCache ? cache(formatValue).bind(this) : formatValue
  }

  validateAndFixByInputEvent(ev) {
    let { modelPropPath, scope, vnode } = this.options
    let value = (ev.target.value || '').toString()
    let oldValue = (this.oldValue || '').toString()
    console.log('value', value, oldValue)

    debug(
      `validateValue: value:${value}-${this.validateValue(
        value
      )} oldValue:${oldValue}-${this.validateValue(oldValue)}`
    )
    if (!this.validateValue(value) && this.validateValue(oldValue)) {
      setProp(
        (scope ? [scope] : []).concat(vnode.context),
        modelPropPath,
        oldValue
      )
      ev.target.value = oldValue
    }
  }

  listen() {
    this.input.addEventListener('keydown', this.onKeydown)
    this.validateAndFixInput &&
      this.input.addEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.addEventListener('paste', this.onPaste)
    }
  }
  unlisten() {
    this.input.removeEventListener('keydown', this.onKeydown)
    this.validateAndFixInput &&
      this.input.removeEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.removeEventListener('paste', this.onPaste)
    }
  }
}

const setup = function(el, options) {
  console.log(options)
  el.numberDirOptions = options
  if (el.formatter) {
    el.formatter.unlisten()
  }
  el.formatter = new Formatter(options)
  el.formatter.listen()
}

export default setup
