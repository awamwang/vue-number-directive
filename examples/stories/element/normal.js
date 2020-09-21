import { action } from '@storybook/addon-actions'
import MyButton from './MyButton'
import ButtonMd from './Button.md'

export const 基础 = arg => ({
  components: {
    MyButton
  },
  template: `
    <my-button text="你哈${arg.text}" @btnClick="btnClick"/>
    `,
  methods: {
    btnClick: action('btnClick')
  }
})

基础.args = {
  text: '这是什么'
}
基础.parameters = {
  notes: { ButtonMd }
}
