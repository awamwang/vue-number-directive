import Vue, { VueConstructor } from 'vue'
import directive, { NAME } from './number/index'
import { Options, GlobalOptions } from './number/option'

export const directiveName = NAME
export const NumberDirective = directive()

export default {
  install(vue: VueConstructor<Vue>, options: GlobalOptions = {}): void {
    vue.directive(options.name || NAME, directive(options))
  }
}

export { GlobalOptions, Options }
