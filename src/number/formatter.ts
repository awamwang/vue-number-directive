import { ParsedOptions } from './option'
import { getInputDom, getDomValue, setDomValue } from './util/dom'
import { removeItem, cache, setProp, Context } from './util/lang'
import { debug, error } from './util/log'

const UseCache = true
const ValidOperationList = [
  'Backspace',
  'Enter',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
]
const ValidNumberCharList = ['0-9', '+', '-', '\\.', 'e']
const UniqueCharList = ['+|-', '\\.', 'e']
const DefaultSepCharList = [',', ' ']

export interface NumberInput extends HTMLElement {
  numberDirOptions?: ParsedOptions
  formatter?: Formatter
}

/**
 * 一组用来测试字符唯一性的函数，UniqueChar在字符串中出现小于一次则测试通过
 */
const UniqueTesters = UniqueCharList.map((c) => {
  const lastValueRegex = new RegExp(`[${c}]`)
  const newCharRegex = new RegExp(`^[${c}]$`)

  return function isUnique(newChar: string, value: string) {
    return !lastValueRegex.test(value) || !newCharRegex.test(newChar)
  }
})

function getSepCharList(
  sep: string | boolean | undefined,
  sepChar: Array<string> | undefined
): Array<string> {
  if (sep) {
    if (Array.isArray(sepChar)) {
      sepChar = sepChar.concat(typeof sep === 'string' ? [sep] : [])
    } else {
      sepChar = DefaultSepCharList.concat(typeof sep === 'string' ? [sep] : [])
    }
  }
  sepChar = sepChar || []
  if (sepChar.some((c) => c.length !== 1)) {
    error("sep's length mush be 1")
  }

  return Array.from(new Set(sepChar))
}

/**
 * 通过配置生成合法性校验正则
 * @param {*} param0
 */
function genValidCharRegex({ positive, integer, flag, sep, sepChar }: ParsedOptions) {
  sepChar = getSepCharList(sep, sepChar)

  const validChar = [...ValidNumberCharList, ...sepChar]

  positive && removeItem(validChar, '-')
  !flag && removeItem(validChar, '-')
  !flag && removeItem(validChar, '+')
  integer && removeItem(validChar, '\\.')

  return new RegExp(`^${ValidOperationList.join('|')}|[${validChar.join('')}]$`)
}

/**
 * 通过配置生成匹配分隔字符的正则
 * @param {*} param0
 */
function genSegCharRegex({ sep, sepChar }: ParsedOptions): RegExp | null {
  sepChar = getSepCharList(sep, sepChar)

  if (sepChar.length) {
    return new RegExp(`(${sepChar.join('|')})`)
  } else {
    return null
  }
}

/**
 * 计算整数部分最大长度（不包括正负符号及分隔符号）
 * @param {*} param0
 */
function getMaxIntegerLength({ minimum, maximum }: ParsedOptions) {
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
function getMaxLength(integerLength: number, { integer, flag, fixed }: ParsedOptions): number {
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
function genValidRegex(integerLength: number, { integer, flag, fixed }: ParsedOptions) {
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
  sepCharRegex: RegExp | null
  validRegex: RegExp
  validateAndFixInput!: (ev: Event) => void
  validateValue!: (str: string) => boolean

  constructor(options: ParsedOptions) {
    this.input = getInputDom(options.el, options.vnode)
    this.options = options

    const maxIntegerLength = getMaxIntegerLength(options)
    this.maxLength = getMaxLength(maxIntegerLength, options)
    this.validCharRegex = genValidCharRegex(options)
    this.sepCharRegex = genSegCharRegex(options)
    this.validRegex = genValidRegex(maxIntegerLength, options)

    this.initListenMethods()
    this.initValidateMethod()
    this.initFormatValueMethod()

    // 初始化时就format一下，保证格式正确
    this.oldValue = this.formatValue(getDomValue(this.input))
  }

  initListenMethods(): void {
    /**
     * 在keydown事件中检测单个字符的合法性，字符的唯一性，max/min
     */
    this.onKeydown = (ev: KeyboardEvent) => {
      this.oldValue = getDomValue(this.input)
      const newValueNumber = Number(this.oldValue + ev.key)
      const { minimum, maximum, exclusiveMinimum, exclusiveMaximum } = this.options

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

      // 不允许连续两个分隔字符
      if (
        this.sepCharRegex &&
        this.sepCharRegex.test(ev.key) &&
        this.sepCharRegex.test(this.oldValue[this.oldValue.length - 1].toString())
      ) {
        debug(`SepChar test fail: input key(${ev.key}), sepCharRegex(${this.sepCharRegex})`)
        ev.preventDefault()
      }

      // 新值不能超出范围
      if (newValueNumber > maximum || (exclusiveMaximum && newValueNumber >= maximum)) {
        debug(`maximum check fail: input key(${ev.key}), newValueNumber(${newValueNumber})`)
        ev.preventDefault()
        this.setValue(maximum.toString())
      }
      if (newValueNumber < minimum || (exclusiveMinimum && newValueNumber <= minimum)) {
        debug(`minimum check fail: input key(${ev.key}), newValueNumber(${newValueNumber})`)
        ev.preventDefault()
        this.setValue(minimum.toString())
      }
    }

    /**
     * 在input事件中检测最新值合法性
     */
    this.validateAndFixInput = this.validateAndFixByInputEvent.bind(this)

    /**
     * 限制粘贴操作
     */
    this.onPaste = (ev: Event) => {
      ev.preventDefault()
    }

    /**
     * 在blur事件中格式化值
     */
    this.onBlur = (ev: Event) => {
      this.formatValue(getDomValue(ev.target))
    }
  }

  purifyValue(value: string): string {
    if (!this.sepCharRegex) {
      return value
    }

    return value.replace(new RegExp(this.sepCharRegex, 'g'), '')
  }

  /**
   * 初始化
   */
  initValidateMethod(): void {
    const validateValue = (value: string): boolean => {
      const pureValue = this.purifyValue(value)

      // 检查长度
      if (pureValue.length > this.maxLength) {
        debug(`maxLength: value(${value}), pureValue(${pureValue}), maxLength(${this.maxLength})`)
        return false
      }
      // 检查整体合法性
      if (!this.validRegex.test(pureValue)) {
        debug(
          `validRegex test fail: value(${value}), pureValue(${pureValue}), validRegex(${this.validRegex})`
        )
        return false
      }

      return true
    }

    this.validateValue = UseCache ? cache(validateValue).bind(this) : validateValue
  }

  initFormatValueMethod(): void {
    /**
     * 整体format
     */
    const formatFullValue = (value: string): string => {
      const { minimum, maximum, exclusiveMinimum, exclusiveMaximum } = this.options
      const pureValue = this.purifyValue(value)
      let parsedValue

      if (this.options.integer || this.options.fixed <= 0) {
        parsedValue = parseInt(pureValue).toString()
      } else {
        parsedValue = parseFloat(pureValue).toString()
      }

      if (!this.validateValue(parsedValue)) {
        parsedValue = ''
      }

      // 不能超出范围
      const parsedValueNumber = Number(parsedValue)
      if (parsedValueNumber > maximum || (exclusiveMaximum && parsedValueNumber >= maximum)) {
        parsedValue = maximum.toString()
      }
      if (parsedValueNumber < minimum || (exclusiveMinimum && parsedValueNumber <= minimum)) {
        parsedValue = minimum.toString()
      }

      if (parsedValue !== pureValue) {
        debug(`formatFullValue: parsedValue(${parsedValue}), pureValue(${pureValue})`)
        this.setValue(parsedValue)
      }

      return parsedValue
    }

    this.formatValue = UseCache ? cache(formatFullValue).bind(this) : formatFullValue
  }

  /**
   * 在input value值变化时调用，用来更正input value
   * @param {*} ev
   */
  validateAndFixByInputEvent(ev: Event): void {
    const value = (getDomValue(ev.target) || '').toString()
    const oldValue = (this.oldValue || '').toString()

    debug(
      `## validate new value: new value(${value}-${this.validateValue(
        value
      )}) oldValue(${oldValue}-${this.validateValue(oldValue)})`
    )

    // 如果之前是合法的，本次不合法，则把值回退回去
    if (!this.validateValue(value) && this.validateValue(oldValue)) {
      this.setValue(oldValue)
    }
  }

  private setValue(oldValue: string) {
    const { modelPropPath, scope, vnode } = this.options

    const doSet = () => {
      // 将scope和vnode本身的context合并，作为完整的查询链，类似作用域链的查询，前面的scope优先级高
      setProp((scope ? [scope] : []).concat([vnode.context as Context]), modelPropPath, oldValue)
      setDomValue(this.input, oldValue)
    }

    doSet()
    // 低版本Vue会出现改不过来情况，在nextTick中再改一遍
    vnode &&
      vnode.componentInstance &&
      vnode.componentInstance.$nextTick(() => {
        doSet()
      })
  }

  listen(): Formatter {
    this.input.addEventListener('keydown', this.onKeydown)
    this.validateAndFixInput && this.input.addEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.addEventListener('paste', this.onPaste)
    }
    this.input.addEventListener('blur', this.onBlur)

    return this
  }
  unlisten(): Formatter {
    this.input.removeEventListener('keydown', this.onKeydown)
    this.validateAndFixInput && this.input.removeEventListener('input', this.validateAndFixInput)
    if (!this.options.canPaste) {
      this.input.removeEventListener('paste', this.onPaste)
    }
    this.input.removeEventListener('blur', this.onBlur)

    return this
  }
  destroy(): void {
    delete this.input.numberDirOptions
    this.unlisten()
  }
}

const init = function (el: NumberInput, options: ParsedOptions): void {
  el.formatter && el.formatter.destroy()

  el.formatter = new Formatter(options).listen()
  el.formatter.input.numberDirOptions = options
  debug(`setup with options: `, options)
}

export default init
