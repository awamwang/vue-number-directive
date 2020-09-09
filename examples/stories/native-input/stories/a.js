import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import AMd from './A.md'

// export const Primary = () => <input type="number" />
export default () => ({
  template: `
    <input :v-number="{model: input1}" @click="action" />
  `,
  data() {
    return {
      input1: '123.00',
      config1: { bind: 'input1' },
      input2: 32,
      config2: {
        bind: 'input2',
        min: '-5',
        max: '100'
      },
      input3: {
        num: ''
      },
      config3: { bind: 'input3.num', min: '0', presion: 3, local: 'FR' },
      input4: {
        arr: [{ v: '' }]
      },
      config4: {
        bind: 'input4.arr[0].v',
        predifined: 'integerNeg',
        numricOptions: {
          decimalPlaces: 1
          // decimalCharacter: ',',
          // digitGroupSeparator: '.',
          // overrideMinMaxLimits: 'ceiling'
        }
      },
      input5: '123.00',
      config5: { bind: 'input5' }
    }
  },
  methods: {
    action() {
      action('clicked')
    }
  }
})
A.story = {
  parameters: {
    notes: { AMd }
  }
}
