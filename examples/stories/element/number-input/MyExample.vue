<template>
  <NumberWrap ref="wrap">
    <el-input-number
      v-model="input1"
      v-number="{ ...$props, model: input1 }"
      @focus="onFocus"
    ></el-input-number>
  </NumberWrap>
</template>

<script>
import { InputNumber } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInputNumber: InputNumber }
}
</script>