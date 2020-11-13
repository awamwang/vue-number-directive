<template>
  <input v-model="inputNum" data-cy v-number="{ ...options, model: inputNum }" @focus="onFocus" />
</template>

<script>
export default {
  data() {
    return {
      inputNum: '123,456,789',
    }
  },
}
</script>
