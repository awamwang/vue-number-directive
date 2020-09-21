import { action } from '@storybook/addon-actions'
import MyButton from './MyButton.vue'

export default {
  title: 'VueNumber/NativeInput',
  // component: MyButton,
  parameters: {}
}

export { 基础 as 测试 } from './normal'

import ButtonMd from './Button.md'
export const 基础使用 = arg => ({
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

基础使用.args = {
  text: '这是什么'
}
基础使用.parameters = {
  notes: { ButtonMd }
}

export const 使用viewport插件 = () => ({
  components: {
    MyButton
  },
  template: `
    <my-button text="点我"/>
    `
})
使用viewport插件.parameters = {}
