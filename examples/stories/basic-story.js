import { basicProps } from './props'

export default function genStory(component, args = {}, parameters, config = {}) {
  const Story = () => ({
    components: {
      MyExample: component,
    },
    // props: basic(args),
    props: {
      ...basicProps,
    },
    template: `<my-example v-bind="$props" :options="$props"/>`,
    ...config,
  })

  Story.args = args
  Story.parameters = parameters

  return Story
}
