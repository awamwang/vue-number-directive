import NumberDirective from './number/index'

export default {
  install(Vue, options = {}) {
    Vue.directive('number', NumberDirective(options))
  }
}
