import { boolean, number, object } from '@storybook/addon-knobs'
import NumberDirectiveWrap from './NumberDirectiveWrap'

export const basicProps = NumberDirectiveWrap.props

export const basicPropControls = {
  debug: { control: 'boolean' },
  scope: { control: 'object' },
  integer: { control: 'boolean' },
  // 'integer[Modifier]': { control: 'boolean' },
  // 'integer[Modifier]': { control: 'boolean' },
  positive: { control: 'boolean' },
  // 'positive[Modifier]': { control: 'boolean' },
  // 'pos[Modifier]': { control: 'boolean' },
  fixed: {
    control: { type: 'number', min: 0, max: Number.MAX_SAFE_INTEGER },
  },
  flag: { control: 'boolean' },
  minimum: {
    control: { type: 'number', min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER },
  },
  maximum: {
    control: { type: 'number', min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER },
  },
  exclusiveMinimum: { control: 'boolean' },
  exclusiveMaximum: { control: 'boolean' },
  sep: { control: 'boolean' },
  schema: { control: 'object' },
}

const defaultValueMap = {
  debug(props) {
    return boolean('Debug', typeof props.debug === 'boolean' ? props.debug : false)
  },
  // model(props) {
  //   return text('Model')
  // },
  // scope(props) {
  //   return object('Scope', () => ({}))
  // },
  integer() {
    return boolean('Integer', false)
  },
  integerModifier() {
    return boolean('IntegerModifier', false)
  },
  intModifier() {
    return boolean('IntModifier', false)
  },
  positive() {
    return boolean('Positive', false)
  },
  positiveModifier() {
    return boolean('PositiveModifier', false)
  },
  posModifier() {
    return boolean('PosModifier', false)
  },
  // sientific(props) {
  //   return boolean('Sientific', false)
  // },
  fixed() {
    return number('Fixed', 2)
  },
  flag() {
    return boolean('Flag', true)
  },
  minimum(props) {
    return number(
      'Minimum',
      props.min !== void 0
        ? props.min
        : props.minimum !== void 0
        ? props.minimum
        : Number.MIN_SAFE_INTEGER,
      {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
      }
    )
  },
  maximum(props) {
    return number(
      'Maximum',
      props.max !== void 0
        ? props.max
        : props.maximum !== void 0
        ? props.maximum
        : Number.MAX_SAFE_INTEGER,
      {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
      }
    )
  },
  exclusiveMinimum(props) {
    return boolean(
      'ExclusiveMinimum',
      typeof props.exclusiveMinimum === 'boolean' ? props.exclusiveMinimum : false
    )
  },
  exclusiveMaximum(props) {
    return boolean(
      'ExclusiveMaximum',
      typeof props.exclusiveMaximum === 'boolean' ? props.exclusiveMaximum : false
    )
  },
  sep(props) {
    return boolean('Sep', typeof props.sep === 'boolean' ? props.sep : false)
  },
  schema(props) {
    let value = object('Schema', props.schema || {})
    console.log('xx', value)

    return () => {
      return value
    }
  },
}

export function basic({ props } = {}) {
  props = props || {}

  const res = Object.assign({}, basicProps)
  for (const key in res) {
    if (defaultValueMap[key]) {
      res[key].default = defaultValueMap[key](props)
    }
  }

  return res
}
