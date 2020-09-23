export const NAME = 'number'
import parseOption from './option'
import setupFormatter from './formatter'
import { isSameOptions } from './util/lang'

export default function(globalOptions = {}) {
  return {
    bind(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      setupFormatter(el, options)
    },
    update(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      if (!isSameOptions(options, el.numberDirOptions)) {
        setupFormatter(el, options)
      }
    },
    unbind(el) {
      el.formatter.unlisten()
    }
  }
}
