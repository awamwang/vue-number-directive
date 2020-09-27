<template>
  <NumberWrap ref="wrap">
    <textarea
      v-model="input1"
      data-cy
      v-number="{ ...$props, model: input1 }"
      @focus="onFocus"
    ></textarea>
  </NumberWrap>
</template>

<script>
export default {}
</script>
