<template>
  <Input
    v-model="input1"
    data-cy
    v-number="{ model: input1, ...options, integer: int, positive: pos, debug }"
  ></Input>
</template>

<script>
export default {
  name: 'MyExample',
  props: ['int', 'pos', 'options', 'debug'],
  data() {
    return {
      input1: '123'
    }
  },
  methods: {
    btnClick() {
      this.$emit('btnClick', this.text)
    }
  }
}
</script>
