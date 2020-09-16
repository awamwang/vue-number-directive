// todo 换TS，定义接口
import { warn } from './util/log'
const ExpressionRegex = /model:([^,}]+),?/

function getModelPath(expression) {
  let matches = expression.replace(/\s|↵/g, '').match(ExpressionRegex)
  if (matches) {
    return matches[1]
  } else {
    return expression
  }
}

function parseSchema(schema) {
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

function getMinMax(config, type) {
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

function optimizeOptions(options) {
  options.flag = options.flag !== void 0 ? options.flag : !options.positive
  if (options.precision && options.integer) {
    warn('precision of integer number must be 0')
    options.precision = 0
  }
  if (options.minimum < 0 && options.positive) {
    warn('minimum of positive number must >= 0')
    options.minimum = 0
  }

  return options
}

export default function(el, binding, vnode, globalOptions) {
  const { value: config, expression, modifiers } = binding

  let modelPropPath = getModelPath(expression)
  let integer = modifiers.int || modifiers.integer || config.integer
  let positive = modifiers.pos || modifiers.positive || config.positive
  let minimum = getMinMax(config, 'min')
  let maximum = getMinMax(config, 'max')
  if (!Number.isSafeInteger(minimum)) {
    warn('minimum is unsafe, precision may be lost')
  }
  if (!Number.isSafeInteger(maximum)) {
    warn('maximum is unsafe, precision may be lost')
  }

  return {
    options: optimizeOptions(
      mergeOptions(
        {
          el,
          vnode,
          modelPropPath,
          scope: config.scope,

          integer,
          positive,
          sientific: config.sientific,
          precision: config.precision !== void 0 ? config.precision : 2,
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
