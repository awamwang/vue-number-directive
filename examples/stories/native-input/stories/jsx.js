import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import note from './note.md'

let story = ({ text }) => ({
  render(h) {
    return <input />
  },
  data() {
    return {
      input1: '',
      config1: { model: this.input1 }
    }
  },
  methods: { action: action('clicked') }
})
story.story = {
  parameters: {
    notes: { note }
  }
}
story.args = {
  text: 'With JSX',
  table: {
    type: Object,
    default() {
      return { a: 1 }
    }
  }
}

export default story
