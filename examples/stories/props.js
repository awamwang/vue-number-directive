import { boolean, text, number, object } from '@storybook/addon-knobs'

export function basic() {
  return {
    debug: {
      type: Boolean,
      default: boolean('Debug', true),
    },
    model: {
      type: String,
      default: text('Model'),
    },
    scope: {
      type: Object,
      default: object('Scope'),
    },

    integer: {
      type: Boolean,
      default: boolean('Integer', false),
    },
    integerModifier: {
      type: Boolean,
      default: boolean('IntegerModifier', false),
    },
    intModifier: {
      type: Boolean,
      default: boolean('IntModifier', false),
    },
    positive: {
      type: Boolean,
      default: boolean('Positive', false),
    },
    positiveModifier: {
      type: Boolean,
      default: boolean('PositiveModifier', false),
    },
    posModifier: {
      type: Boolean,
      default: boolean('PosModifier', false),
    },

    sientific: {
      type: Boolean,
      default: boolean('Sientific', false),
    },
    fixed: {
      type: Number,
      default: number('fixed', 2),
    },
    flag: {
      type: Boolean,
      default: boolean('Flag', false),
    },
    minimum: {
      type: Number | String,
      default: number('Minimum', Number.MIN_SAFE_INTEGER),
    },
    maximum: {
      type: Number | String,
      default: number('Maximum', Number.MAX_SAFE_INTEGER),
    },
    // exclusiveMinimum,
    // exclusiveMaximum,
    sep: {
      type: Boolean | String,
      default: boolean('Sep', false),
    },
  }
}
