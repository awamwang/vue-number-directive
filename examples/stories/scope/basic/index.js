
import { basic } from '../../props'
import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = arg => ({
  components: {
    MyExample
  },
  props: basic(),
  template: `
    <my-example v-bind="$props"/>
    `
})

Story.args = {}
Story.parameters = {
  notes: { NoteMd }
}
