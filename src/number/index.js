export const NAME = 'number'
import parseOption from './option'
import Formatter from './formatter'
import { setProp } from './util/lang'
import { debug } from './util/log'

export default function (globalOptions) {
  return {
    bind(el, binding, vnode) {
      const { options } = parseOption(el, binding, vnode, globalOptions)
      el.numberDirOptions = options
      el.formatter = new Formatter(options)
      el.formatter.listen()

      console.log(binding, options, el.formatter)
    },
    update(el, binding, vnode) {
      let { numberDirOptions, formatter } = el
      let value = (binding.value.model || '').toString()
      let oldValue = (binding.oldValue.model || '').toString()
      console.log('value', value, oldValue)

      debug(
        `validateValue: value:${value}-${formatter.validateValue(
          value
        )} oldValue:${oldValue}-${formatter.validateValue(oldValue)}`
      )
      if (
        !formatter.validateValue(value) &&
        formatter.validateValue(oldValue)
      ) {
        setProp(
          (numberDirOptions.scope ? [numberDirOptions.scope] : []).concat(
            vnode.context
          ),
          numberDirOptions.modelPropPath,
          oldValue
        )
      }
    },
    unbind(el) {
      el.formatter.unlisten()
    }
  }
}
