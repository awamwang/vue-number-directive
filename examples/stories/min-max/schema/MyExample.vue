<template>
  <div>
    <el-input v-model="input1" v-number="{ ...options, model: input1 }" @focus="onFocus"></el-input>
    <h3>Current Schema:</h3>
    <p>{{ options.schema }}</p>
  </div>
</template>

<script>
import { Input } from 'element-ui'

export default {
  components: { elInput: Input },
  props: {},
}
</script>
