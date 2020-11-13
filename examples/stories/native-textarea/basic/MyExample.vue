<template>
  <textarea
    v-model="input1"
    data-cy
    v-number="{ ...options, model: input1 }"
    @focus="onFocus"
  ></textarea>
</template>

<script>
export default {}
</script>
