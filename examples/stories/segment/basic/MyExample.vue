<template>
  <NumberWrap ref="wrap">
    <input v-model="inputNum" data-cy v-number="{ ...$props, model: inputNum, sep: true }" @focus="onFocus" />
  </NumberWrap>
</template>

<script>
export default {
  data() {
    return {
      inputNum: '123,456,789'
    }
  }
}
</script>
