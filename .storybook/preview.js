import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import VueNumber from '../src/index'

Vue.use(VueNumber)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

// export const decorators = [withKnobs]
