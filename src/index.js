import NumberDirective, { NAME } from './number/index'

export default {
  install(Vue, options = {}) {
    Vue.directive(options.name || NAME, NumberDirective(options))
  }
}
