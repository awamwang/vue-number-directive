import { VNode, DirectiveOptions } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
export const NAME = 'number'
import parseOption, { GlobalOptions, ParsedOptions } from './option'
import initFormatter, { NumberInput } from './formatter'
import { isSameOption } from './util/lang'

export default function (globalOptions: GlobalOptions = {}): DirectiveOptions {
  return {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      initFormatter(el, options)
    },
    update(el: NumberInput, binding: DirectiveBinding, vnode: VNode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)

      if (
        !el.formatter ||
        !isSameOption(options, el.formatter.input.numberDirOptions as ParsedOptions)
      ) {
        initFormatter(el, options)
      }
    },
    unbind(el: NumberInput) {
      el.formatter && el.formatter.destroy()
    }
  }
}
