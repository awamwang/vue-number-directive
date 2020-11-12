<template>
  <NumberWrap ref="wrap">
    <input v-model="input1" data-cy v-number="{ ...$props, model: input1 }" @focus="onFocus" />
  </NumberWrap>
  <!-- <NumberWrap ref="wrap1">
    <input
      v-model="input1"
      data-cy
      v-number="{ ...$props, model: input1 }"
      @focus="onFocus"
    />
  </NumberWrap> -->
</template>

<script>
export default {}
</script>
