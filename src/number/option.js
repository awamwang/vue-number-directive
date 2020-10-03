// todo 换TS，定义接口
import { configLog, warn } from './util/log'
const ExpressionRegex = /model:([^,}]+),?/

export function getModelPath(expression, vnode) {
  let matches = expression.replace(/\s|↵/g, '').match(ExpressionRegex)
  if (matches) {
    return matches[1]
  } else {
    return vnode.data.model ? vnode.data.model.expression : expression
  }
}

export function parseSchema(schema) {
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

export function getMinMax(config, type) {
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
  }
}

function mergeOptions(options, schema, globalOptions) {
  Object.keys(schema).forEach(key => {
    if (schema[key] !== void 0 && schema[key] !== null) {
      options[key] = schema[key]
    }
  })
  Object.keys(globalOptions).forEach(key => {
    if (options[key] === void 0 && options[key] === null) {
      options[key] = globalOptions[key]
    }
  })

  return options
}

export function optimizeOptions(options) {
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

export default function(el, binding, vnode, globalOptions) {
  const { value: config, expression, modifiers } = binding

  let modelPropPath = getModelPath(expression, vnode)
  let integer = modifiers.int || modifiers.integer || config.integer
  let positive = modifiers.pos || modifiers.positive || config.positive
  let minimum = getMinMax(config, 'min')
  let maximum = getMinMax(config, 'max')
  if (!Number.isSafeInteger(minimum)) {
    warn('minimum is unsafe, fixed may be lost')
  }
  if (!Number.isSafeInteger(maximum)) {
    warn('maximum is unsafe, fixed may be lost')
  }

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
          fixed: config.fixed !== void 0 ? config.fixed : 2,
          flag: config.flag,
          minimum,
          maximum,
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
