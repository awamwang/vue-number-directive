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
