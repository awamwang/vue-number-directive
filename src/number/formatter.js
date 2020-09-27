import { getInputDom, getDomValue, setDomValue } from './util/dom'
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

/**
 * 一组用来测试字符唯一性的函数，UniqueChar在字符串中出现小于一次则测试通过
 */
const UniqueTesters = UniqueChar.map(c => {
  let lastValueRegex = new RegExp(`[${c}]`)
  let newCharRegex = new RegExp(`^[${c}]$`)

  return function isUnique(newChar, value) {
    return !lastValueRegex.test(value) || !newCharRegex.test(newChar)
  }
})

/**
 * 通过配置生成合法性校验正则
 * @param {*} param0
 */
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

/**
 * 计算整数数字最大长度（不包括符号）
 * @param {*} param0
 */
function getMaxIntegerLength({ minimum, maximum, sep, sepChar = [] }) {
  return Math.max(
    parseInt(minimum >= 0 ? minimum : -minimum).toString().length,
    parseInt(maximum >= 0 ? maximum : -maximum).toString().length
  )
}

/**
 * 计算整体最大长度（包括符号）
 *
 * @param {*} integerLength
 * @param {*} param0
 */
function getMaxLength(
  integerLength,
  { sientific, integer, flag, minimum, maximum, precision, sep, sepChar = [] }
) {
  flag && integerLength++
  !integer && integerLength++
  precision && (integerLength += precision)

  return integerLength
}

/**
 * 根据配置产生一个合法性验证正则
 *
 * @param {*} integerLength
 * @param {*} param1
 */
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

    let maxIntegerLength = getMaxIntegerLength(options)
    this.maxLength = getMaxLength(maxIntegerLength, options)
    this.validCharRegex = genValidCharRegex(options)
    this.validRegex = genValidRegex(maxIntegerLength, options)

    this.oldValue = getDomValue(this.input)

    this.initListenMethods()
    this.initValidateMethod()
    this.initFormatValueMethod()
  }

  initListenMethods() {
    /**
     * 在keydown事件中检测单个字符的合法性，字符的唯一性，max/min(todo)
     */
    this.onKeydown = function(ev) {
      this.oldValue = getDomValue(this.input)
      if (!this.validCharRegex.test(ev.key)) {
        debug(
          `validCharRegex test fail: input key(${ev.key}), validCharRegex(${this.validCharRegex})`
        )
        ev.preventDefault()
      }

      if (
        UniqueTesters.some(tester => !tester(ev.key, getDomValue(ev.target)))
      ) {
        debug(
          `UniqueTesters test fail: input key(${ev.key}), value(${getDomValue(
            ev.target
          )})`
        )
        ev.preventDefault()
      }
    }.bind(this)

    /**
     * 在input事件中检测最新值合法性
     */
    this.validateAndFixInput = this.validateAndFixByInputEvent.bind(this)

    /**
     * 限制粘贴操作
     */
    this.onPaste = function(ev) {
      ev.preventDefault()
    }.bind(this)

    /**
     * 在blur事件中格式化值
     */
    this.onBlur = function(ev) {
      this.formatValue(getDomValue(ev.target))
    }.bind(this)
  }

  /**
   * 初始化
   */
  initValidateMethod() {
    let validateValue = value => {
      if (value.length > this.maxLength) {
        debug(`maxLength: value(${value}), maxLength(${this.maxLength})`)
        return false
      }
      if (!this.validRegex.test(value)) {
        debug(
          `validRegex test fail: value(${value}), validRegex(${this.validRegex})`
        )
        return false
      }

      return true
    }

    this.validateValue = UseCache
      ? cache(validateValue).bind(this)
      : validateValue
  }

  initFormatValueMethod() {
    /**
     * 整体format todo
     */
    let formatFullValue = value => {
      return value
    }

    this.formatValue = UseCache
      ? cache(formatFullValue).bind(this)
      : formatFullValue
  }

  /**
   * 在input value值变化时调用，用来更正input value
   * @param {*} ev
   */
  validateAndFixByInputEvent(ev) {
    let { modelPropPath, scope, vnode } = this.options
    let value = (getDomValue(ev.target) || '').toString()
    let oldValue = (this.oldValue || '').toString()

    debug(
      `## validate new value: new value(${value}-${this.validateValue(
        value
      )}) oldValue(${oldValue}-${this.validateValue(oldValue)})`
    )

    // 如果之前是合法的，本次不合法，则把值回退回去
    if (!this.validateValue(value) && this.validateValue(oldValue)) {
      setProp(
        (scope ? [scope] : []).concat(vnode.context),
        modelPropPath,
        oldValue
      )
      setDomValue(ev.target, oldValue)
    }
  }

  listen() {
    this.input.addEventListener('keydown', this.onKeydown)
    this.validateAndFixInput &&
      this.input.addEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.addEventListener('paste', this.onPaste)
    }

    return this
  }
  unlisten() {
    this.input.removeEventListener('keydown', this.onKeydown)
    this.validateAndFixInput &&
      this.input.removeEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.removeEventListener('paste', this.onPaste)
    }

    return this
  }
  destroy() {
    delete this.input.numberDirOptions
    this.unlisten()
  }
}

const init = function(el, options) {
  el.formatter && el.formatter.destroy()

  el.formatter = new Formatter(options).listen()
  el.formatter.input.numberDirOptions = options
  debug(`setup with options: `, options)
}

export default init
