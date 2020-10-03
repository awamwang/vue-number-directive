<template>
  <NumberWrap ref="wrap">
    <Input
      v-model="input1"
      data-cy
      v-number="{ ...$props, model: input1 }"
      @focus="onFocus"
    ></Input>
  </NumberWrap>
</template>

<script>
export default {}
</script>
