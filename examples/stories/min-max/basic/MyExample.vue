<template>
  <input v-model="input1" data-cy v-number="{ ...options, model: input1 }" @focus="onFocus" />
</template>

<script>
export default {}
</script>
