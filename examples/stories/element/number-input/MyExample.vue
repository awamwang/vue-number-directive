<template>
  <el-input-number
    v-model="input1"
    v-number="{ model: input1, ...options, integer: int, positive: pos}"
  ></el-input-number>
</template>

<script>
import { InputNumber } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInputNumber: InputNumber },
  props: ['int', 'pos', 'options'],
  data() {
    return {
      input1: '123'
    }
  },
  methods: {}
}
</script>