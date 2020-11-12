// todo 换TS，定义接口
import { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { Context } from './util/lang'
import { configLog, warn } from './util/log'
const ExpressionRegex = /model:([^,}]+),?/

interface VNodeData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: { expression: any }
}

export interface SchemaOptions {
  integer?: boolean
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  multipleOf?: number
}

export interface Options {
  debug?: boolean
  scope?: Array<Context>

  integer?: boolean
  positive?: boolean
  fixed?: number
  flag?: boolean
  min?: number
  max?: number
  minimum?: number
  maximum?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
  multipleOf?: number
  sep?: boolean | string
  sepChar?: Array<string>

  [index: string]: unknown
}

export interface ParsedOptions extends Options {
  el: HTMLElement
  vnode: VNode
  modelPropPath: string

  minimum: number
  maximum: number
}

export interface GlobalOptions extends Options {
  name?: string
}

// eslint-disable-next-line
export function getModelPath(expression: any, vnode: VNode): string {
  const matches = expression.replace(/\s|↵/g, '').match(ExpressionRegex)
  if (matches) {
    return matches[1]
  } else {
    return (vnode.data as VNodeData).model ? (vnode.data as VNodeData).model.expression : expression
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseSchema(schema: Options): SchemaOptions {
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

export function getMinMax(config: Options, type: 'min' | 'max'): number {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  binding: DirectiveBinding,
  vnode: VNode,
  globalOptions: GlobalOptions
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
