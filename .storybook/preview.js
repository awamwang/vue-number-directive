import { storiesOf } from '@storybook/vue'
import NumberWrap from '../examples/stories/NumberDirectiveWrap'
import './vue-config'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  component: NumberWrap,
  controls: { expanded: true },
  argTypes: {}
}
