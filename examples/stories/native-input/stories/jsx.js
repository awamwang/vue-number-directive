import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import AMd from './A.md'

let story = () => ({
  render(h) {
    return <my-button onClick={this.action}>With JSX</my-button>
  },
  methods: { action: linkTo('clicked') }
})
story.story = {
  parameters: {
    notes: { AMd }
  }
}

export default story
