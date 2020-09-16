import { action } from '@storybook/addon-actions'
import note from './normal.md'

const Story = () => ({
  template: `
    <input v-model="input1" v-number="{model: input1}" @click="action" />
    <input v-model="input1" v-number="{model: input1}" @click="action" />
  `,
  data() {
    return {
      input1: '123.00'
    }
  },
  methods: {
    action() {
      action('clicked')
    }
  }
})
Story.story = {
  parameters: {
    notes: { note }
  }
}

export default Story
