import { basic } from './props'

export default function(component, args, parameters) {
  const Story = args => ({
    components: {
      MyExample: component
    },
    props: basic(),
    template: `
      <my-example v-bind="$props"/>
      `
  })
  
  Story.args = args
  Story.parameters = parameters

  return Story
}