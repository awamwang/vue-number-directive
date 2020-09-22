<template>
  <el-input
    v-model="input1"
    v-number="{ model: input1, ...options, integer: int, positive: pos}"
  ></el-input>
</template>

<script>
import { Input } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInput: Input },
  props: ['int', 'pos', 'options'],
  data() {
    return {
      input1: '123'
    }
  },
  methods: {}
}
</script>