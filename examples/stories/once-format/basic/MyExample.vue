<template>
  <div>
    <p>Original value is {{ oriValue }}</p>
    <input v-model="input1" data-cy v-number="{ ...options, model: input1 }" @focus="onFocus" />
  </div>
</template>

<script>
const oriValue = '12322,22'

export default {
  data() {
    return {
      oriValue,
      input1: oriValue,
    }
  },
}
</script>
