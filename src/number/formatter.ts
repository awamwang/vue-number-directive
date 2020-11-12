import { ParsedOptions } from './option'
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

interface NumberInput extends HTMLElement {
  numberDirOptions?: ParsedOptions
}

/**
 * 一组用来测试字符唯一性的函数，UniqueChar在字符串中出现小于一次则测试通过
 */
const UniqueTesters = UniqueChar.map((c) => {
  const lastValueRegex = new RegExp(`[${c}]`)
  const newCharRegex = new RegExp(`^[${c}]$`)

  return function isUnique(newChar: string, value: string) {
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
  fixed,
  sep,
  sepChar = []
}: ParsedOptions) {
  if (sep && !Array.isArray(sepChar)) {
    sepChar = ValidSepChar
  }
  const validChar = [...AllVailidNumberChar, ...sepChar]

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
function getMaxIntegerLength({ minimum, maximum, sep, sepChar = [] }: ParsedOptions) {
  return Math.max(
    parseInt((minimum >= 0 ? minimum : -minimum).toString()).toString().length,
    parseInt((maximum >= 0 ? maximum : -maximum).toString()).toString().length
  )
}

/**
 * 计算整体最大长度（包括符号）
 *
 * @param {*} integerLength
 * @param {*} param0
 */
function getMaxLength(
  integerLength: any,
  { sientific, integer, flag, minimum, maximum, fixed, sep, sepChar = [] }: any
) {
  flag && integerLength++
  !integer && integerLength++
  fixed && (integerLength += fixed)

  return integerLength
}

/**
 * 根据配置产生一个合法性验证正则
 *
 * @param {*} integerLength
 * @param {*} param1
 */
function genValidRegex(
  integerLength: any,
  { sientific, integer, flag, fixed, sep, sepChar = [] }: ParsedOptions
) {
  let regexStr = `([1-9]?)([0-9]{0,${integerLength - 1}})?`

  flag && (regexStr = '[+-]?' + regexStr)
  !integer && (regexStr += `(\\.{0,1})?(\\.[0-9]{1,${fixed}})?`)

  return new RegExp(`^${regexStr}$`)
}

export class Formatter {
  formatValue: any
  input: NumberInput
  maxLength: number
  oldValue: string
  onBlur: any
  onKeydown: any
  onPaste: any
  options: ParsedOptions
  validCharRegex: RegExp
  validRegex: RegExp
  validateAndFixInput: any
  validateValue: any
  constructor(options: ParsedOptions) {
    this.input = getInputDom(options.el, options.vnode)
    this.options = options

    const maxIntegerLength = getMaxIntegerLength(options)
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
    this.onKeydown = (ev: KeyboardEvent) => {
      this.oldValue = getDomValue(this.input)
      if (!this.validCharRegex.test(ev.key)) {
        debug(
          `validCharRegex test fail: input key(${ev.key}), validCharRegex(${this.validCharRegex})`
        )
        ev.preventDefault()
      }

      if (UniqueTesters.some((tester) => !tester(ev.key, getDomValue(ev.target)))) {
        debug(`UniqueTesters test fail: input key(${ev.key}), value(${getDomValue(ev.target)})`)
        ev.preventDefault()
      }
    }

    /**
     * 在input事件中检测最新值合法性
     */
    this.validateAndFixInput = this.validateAndFixByInputEvent.bind(this)

    /**
     * 限制粘贴操作
     */
    this.onPaste = (ev: any) => {
      ev.preventDefault()
    }

    /**
     * 在blur事件中格式化值
     */
    this.onBlur = (ev: any) => {
      this.formatValue(getDomValue(ev.target))
    }
  }

  /**
   * 初始化
   */
  initValidateMethod() {
    const validateValue = (value: any) => {
      if (value.length > this.maxLength) {
        debug(`maxLength: value(${value}), maxLength(${this.maxLength})`)
        return false
      }
      if (!this.validRegex.test(value)) {
        debug(`validRegex test fail: value(${value}), validRegex(${this.validRegex})`)
        return false
      }

      return true
    }

    this.validateValue = UseCache ? cache(validateValue).bind(this) : validateValue
  }

  initFormatValueMethod() {
    /**
     * 整体format todo
     */
    const formatFullValue = (value: any) => {
      return value
    }

    this.formatValue = UseCache ? cache(formatFullValue).bind(this) : formatFullValue
  }

  /**
   * 在input value值变化时调用，用来更正input value
   * @param {*} ev
   */
  validateAndFixByInputEvent(ev: any) {
    const { modelPropPath, scope, vnode } = this.options
    const value = (getDomValue(ev.target) || '').toString()
    const oldValue = (this.oldValue || '').toString()

    debug(
      `## validate new value: new value(${value}-${this.validateValue(
        value
      )}) oldValue(${oldValue}-${this.validateValue(oldValue)})`
    )

    // 如果之前是合法的，本次不合法，则把值回退回去
    if (!this.validateValue(value) && this.validateValue(oldValue)) {
      // 将scope和vnode本身的context合并，作为完整的查询链，类似作用域链的查询，前面的scope优先级高
      setProp((scope ? [scope] : []).concat(vnode.context), modelPropPath, oldValue)
      setDomValue(ev.target, oldValue)
    }
  }

  listen() {
    this.input.addEventListener('keydown', this.onKeydown)
    this.validateAndFixInput && this.input.addEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.addEventListener('paste', this.onPaste)
    }

    return this
  }
  unlisten() {
    this.input.removeEventListener('keydown', this.onKeydown)
    this.validateAndFixInput && this.input.removeEventListener('input', this.validateAndFixInput)
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

const init = function (el: any, options: any) {
  el.formatter && el.formatter.destroy()

  el.formatter = new Formatter(options).listen()
  el.formatter.input.numberDirOptions = options
  debug(`setup with options: `, options)
}

export default init
