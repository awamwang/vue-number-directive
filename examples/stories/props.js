import { boolean } from '@storybook/addon-knobs'

export function basic() {
  return {
    int: {
      default: boolean('Integer', true)
    },
    pos: {
      default: boolean('Positive', false)
    }
  }
}
