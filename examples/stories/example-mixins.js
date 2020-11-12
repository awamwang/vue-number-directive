// import { action } from '@storybook/addon-actions'
import { basic } from './props'

export const OptionsToShow = [
  'debug',
  'model',
  'scope',

  'integer',
  // 'integerModifier',
  // 'intModifier',
  'positive',
  // 'positiveModifier',
  // 'posModifier',

  'fixed',
  'flag',
  'minimum',
  'maximum',
  'exclusiveMinimum',
  'exclusiveMaximum',
  'sep',
]

function getValue(obj, key) {
  if (key === 'model') {
    return obj['modelPropPath']
  } else {
    return obj[key]
  }
}

export default {
  props: basic(),
  data() {
    return {
      input1: '123',
      parsedOptions: null,
    }
  },
  computed: {
    shownOptions() {
      return OptionsToShow.map((key) => ({
        key,
        value: getValue(this.parsedOptions, key),
      }))
    },
  },
  methods: {
    onFocus(ev) {
      this.parsedOptions = ev.target.numberDirOptions

      if (this.parsedOptions && this.$refs['wrap']) {
        this.$refs['wrap'].myOptions = this.shownOptions
        // console.log(this.parsedOptions)
        this.$refs['wrap'].parsedOptions = OptionsToShow.reduce((res, k) => {
          res[k] = this.parsedOptions[k]
          return res
        }, {})
      }
    },
  },
}
