<template>
  <Input v-model="input1" data-cy v-number="{ ...options, model: input1 }" @focus="onFocus"></Input>
</template>

<script>
export default {
  props: {},
}
</script>
