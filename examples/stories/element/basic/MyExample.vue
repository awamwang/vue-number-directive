<template>
  <NumberWrap ref="wrap">
    <el-input
      v-model="input1"
      v-number="{ ...$props, model: input1, minimum: -100, maximum: 100 }"
      @focus="onFocus"
    ></el-input>
  </NumberWrap>
</template>

<script>
import { Input } from 'element-ui'

export default {
  components: { elInput: Input },
}
</script>
