import { basic } from '../../props'
import { boolean } from '@storybook/addon-knobs'
import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = arg => ({
  components: {
    MyExample
  },
  props: {
    debug: {
      default: boolean('Debug', true)
    },
    ...basic()
  },
  template: `
    <my-example v-bind="$props"/>
    `
})

Story.args = {}
Story.parameters = {
  notes: { NoteMd }
}
