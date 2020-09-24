export const NAME = 'number'
import parseOption from './option'
import initFormatter from './formatter'
import { isSameOption } from './util/lang'

export default function(globalOptions = {}) {
  return {
    bind(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      initFormatter(el, options)
    },
    update(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      if (!isSameOption(options, el.numberDirOptions)) {
        initFormatter(el, options)
      }
    },
    unbind(el) {
      
    }
  }
}
