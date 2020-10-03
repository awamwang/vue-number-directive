import NumberDirectiveWrap from '../NumberDirectiveWrap'

export default {
  title: 'VueNumber/NativeTextarea',
  component: NumberDirectiveWrap,
  parameters: {},
  argTypes: {
    label: { control: 'text' }
  }
}

export { Story as BasicUsage } from './basic/index'
