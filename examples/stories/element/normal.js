import { action } from '@storybook/addon-actions'
import MyExample from './MyExample'
import NoteMd from './Note.md'

export const Story = arg => ({
  components: {
    MyExample
  },
  template: `
    <my-example text="你哈${arg.text}" @btnClick="btnClick"/>
    `,
  methods: {
    btnClick: action('btnClick')
  }
})

Story.args = {
  text: '这是什么'
}
Story.parameters = {
  notes: { NoteMd }
}
