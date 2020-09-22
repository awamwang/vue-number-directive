import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = ({ options }) => ({
  components: {
    MyExample
  },
  props: {},
  data() {
    return {
      options
    }
  },
  template: `
    <my-example v-bind="$props" :options="options"/>
    `
})

Story.args = {
  options: {}
}
Story.parameters = {
  notes: { NoteMd }
}
