import Vue from 'vue'
import VueNumber from '../src/index'

Vue.use(VueNumber)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}
