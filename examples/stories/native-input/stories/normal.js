import { action } from '@storybook/addon-actions'
import Com from './Input'
import note from './normal.md'

const Story = ({ options }) => ({
  // components: { Com },
  // <Com :options="options"/>
  template: `
    <div></div>
  `,
  data() {
    return {
      input1: '123.00',
      options
    }
  },
  methods: {
    action() {
      action('clicked')
    }
  }
})
Story.arg = {
  options: {}
}
Story.parameters = {
  notes: { note }
}

export default Story
