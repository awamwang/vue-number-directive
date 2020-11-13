
import { basicPropControls } from '../examples/stories/props'
import './vue-config'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
  argTypes: basicPropControls,
}

export const decorators = [
  () => ({
    template: `<NumberWrap ref="wrap"><story /></NumberWrap>`,
  }),
]
