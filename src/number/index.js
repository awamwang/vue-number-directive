export const NAME = 'number'
import parseOption from './option'
import initFormatter, {destroy as dest} from './formatter'
import { isSameOption } from './util/lang'

export default function(globalOptions = {}) {
  return {
    bind(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      initFormatter(el, options)
    },
    update(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      if (
        !el.formatter ||
        !isSameOption(options, el.formatter.input.numberDirOptions)
      ) {
        initFormatter(el, options)
      }
    },
    unbind(el) {
      el.formatter && el.formatter.destroy()
    }
  }
}
