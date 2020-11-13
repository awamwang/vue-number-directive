<template>
  <el-input-number
    v-model="input1"
    v-number="{ ...options, model: input1 }"
    @focus="onFocus"
  ></el-input-number>
</template>

<script>
// [options.intModifier || options.integerModifier ? "ini" : ""]
import { InputNumber } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInputNumber: InputNumber },
}
</script>
