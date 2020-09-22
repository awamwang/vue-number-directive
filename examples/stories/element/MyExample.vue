<template>
  <el-input
    v-model="input1"
    v-number="{ model: input1, ...options }"
  ></el-input>
</template>

<script>
import { Input } from 'element-ui'

export default {
  components: { elInput: Input },
  name: 'MyExample',
  props: {
    options: Object
  },
  data() {
    return {
      input1: '123'
    }
  },
  methods: {}
}
</script>