<template>
  <el-input v-model="input1" v-number="{ ...options, model: input1 }" @focus="onFocus"></el-input>
</template>

<script>
import { Input } from 'element-ui'

export default {
  components: { elInput: Input },
  props: {},
}
</script>
