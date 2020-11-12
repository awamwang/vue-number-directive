// todo 换TS，定义接口
import { configLog, warn } from './util/log'
const ExpressionRegex = /model:([^,}]+),?/

export interface SchemaOptions {
  integer?: boolean
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  multipleOf?: number
}

export interface Options {
  el?: HTMLElement
  vnode?: any
  debug?: boolean
  modelPropPath?: string
  scope?: Array<any>

  integer?: boolean
  positive?: boolean
  sientific?: boolean
  fixed?: number
  flag?: boolean
  min?: number
  max?: number
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number
  exclusiveMaximum?: number
  sep?: boolean | string

  [index: string]: any
}

export interface ParsedOptions extends Options {
  minimum: number
  maximum: number
}

export interface GlobalOptions extends Options {
  name?: string
}

export function getModelPath(expression: any, vnode: any): string {
  const matches = expression.replace(/\s|↵/g, '').match(ExpressionRegex)
  if (matches) {
    return matches[1]
  } else {
    return vnode.data.model ? vnode.data.model.expression : expression
  }
}

export function parseSchema(schema: any): SchemaOptions {
  if (!schema) {
    return {}
  }

  return {
    integer: schema.type === 'integer',
    minimum: schema.minimum,
    maximum: schema.maximum,
    exclusiveMinimum: schema.exclusiveMinimum,
    exclusiveMaximum: schema.exclusiveMaximum,
    multipleOf: schema.multipleOf
  }
}

export function getMinMax(config: any, type: any): number {
  if (type === 'min') {
    return typeof config.min === 'number'
      ? config.min
      : typeof config.minimum === 'number'
      ? config.minimum
      : Number.MIN_SAFE_INTEGER
  } else if (type === 'max') {
    return typeof config.max === 'number'
      ? config.max
      : typeof config.maximum === 'number'
      ? config.maximum
      : Number.MAX_SAFE_INTEGER
  } else {
    return 0
  }
}

function mergeOptions(options: Options, schema: any, globalOptions: GlobalOptions): ParsedOptions {
  Object.keys(schema).forEach((key) => {
    // schema的优先级高
    if (schema[key] !== void 0 && schema[key] !== null) {
      options[key] = schema[key]
    }
  })
  Object.keys(globalOptions).forEach((key: string) => {
    if (options[key] === void 0 || options[key] === null) {
      options[key] = globalOptions[key]
    }
  })

  options.minimum = getMinMax(options, 'min')
  options.maximum = getMinMax(options, 'max')
  options.fixed = options.fixed !== void 0 ? options.fixed : 2
  if (!Number.isSafeInteger(options.minimum)) {
    warn('minimum is unsafe, precision may be lost')
  }
  if (!Number.isSafeInteger(options.maximum)) {
    warn('maximum is unsafe, precision may be lost')
  }

  return options as ParsedOptions
}

export function optimizeOptions(options: ParsedOptions): ParsedOptions {
  options.flag = options.flag !== void 0 ? options.flag : !options.positive
  if (options.fixed && options.integer) {
    // warn('fixed of integer number must be 0')
    options.fixed = 0
  }
  if (options.minimum < 0 && options.positive) {
    // warn('minimum of positive number must >= 0')
    options.minimum = 0
  }
  configLog({ debug: options.debug })

  return options
}

export default function (
  el: HTMLElement,
  binding: any,
  vnode: any,
  globalOptions: any
): {
  options: ParsedOptions
} {
  const { value: config, expression, modifiers } = binding

  const modelPropPath = getModelPath(expression, vnode)
  const integer = modifiers.int || modifiers.integer || config.integer
  const positive = modifiers.pos || modifiers.positive || config.positive

  return {
    options: optimizeOptions(
      mergeOptions(
        {
          el,
          vnode,
          debug: config.debug,
          modelPropPath,
          scope: config.scope,

          integer,
          positive,
          sientific: config.sientific,
          fixed: config.fixed,
          flag: config.flag,
          min: config.min,
          max: config.max,
          minimum: config.minimum,
          maximum: config.maximum,
          // exclusiveMinimum,
          // exclusiveMaximum,
          sep: config.sep
        },
        parseSchema(config.schema),
        globalOptions
      )
    )
  }
}
