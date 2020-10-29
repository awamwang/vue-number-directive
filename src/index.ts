import Vue from 'vue'
import directive, { NAME } from './number/index'
import { Options, GlobalOptions } from './number/option'

export let NumberDirective = directive()

export default {
  install(vue: any, options: GlobalOptions = {}) {
    vue.directive(options.name || NAME, directive(options))
  }
}

export {
  GlobalOptions,
  Options
}