import directive, { NAME } from './number/index'

export let NumberDirective = directive()

export default {
  install(Vue, options = {}) {
    Vue.directive(options.name || NAME, directive(options))
  }
}
