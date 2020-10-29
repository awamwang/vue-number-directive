export const NAME = 'number'
import parseOption, { GlobalOptions } from './option'
import initFormatter from './formatter'
import { isSameOption } from './util/lang'

export default function (globalOptions: GlobalOptions = {}) {
  return {
    bind(el: any, binding: any, vnode: any) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      initFormatter(el, options)
    },
    update(el: any, binding: any, vnode: any) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      if (
        !el.formatter ||
        !isSameOption(options, el.formatter.input.numberDirOptions)
      ) {
        initFormatter(el, options)
      }
    },
    unbind(el: any) {
      el.formatter && el.formatter.destroy()
    }
  };
}
