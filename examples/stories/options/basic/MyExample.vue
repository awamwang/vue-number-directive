<template>
  <div>
    <p>modifier: int</p>
    <input
      v-model="input1"
      v-number.int="{ model: input1, ...options }"
      @focus="(ev) => onOptions(ev.target.numberDirOptions)"
    />

    <p>modifier: pos</p>
    <input
      v-model="input2"
      v-number.pos="{ model: input2, ...options }"
      @focus="(ev) => onOptions(ev.target.numberDirOptions)"
    />

    <p>modifier: int.pos</p>
    <input v-model="input3" v-number.int.pos="{ model: input3, ...options }" @focus="(ev) => onOptions(ev.target.numberDirOptions)"/>

    <p>modifier: integer</p>
    <input v-model="input4" v-number.integer="{ model: input4, ...options }" @focus="(ev) => onOptions(ev.target.numberDirOptions)"/>

    <p>modifier: positive</p>
    <input v-model="input5" v-number.positive="{ model: input5, ...options }" @focus="(ev) => onOptions(ev.target.numberDirOptions)"/>
<!-- 
    <p>modifier: pos</p>
    <input v-model="input6" v-number.pos="{ model: input6, ...options }" @focus="(ev) => onOptions(ev.target.numberDirOptions)"/> -->
  </div>
</template>

<script>
import { action } from '@storybook/addon-actions'

export default {
  name: 'MyExample',
  props: {
    options: Object
  },
  data() {
    return {
      input1: '123',
      input2: '123',
      input3: '123',
      input4: '123',
      input5: '123',
      input6: '123',
      parsedOptions: {}
    }
  },
  methods: {
    onOptions: action('parsedOptions'),
    onFocus(ev) {
      this.parsedOptions = ev.target.numberDirOptions
      console.log('parsedOptions', this.parsedOptions)
      // action('options', this.parsedOptions)
    }
  }
}
</script>
