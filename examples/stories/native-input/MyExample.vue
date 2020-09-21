<template>
  <Input v-model="input1" v-number="{ model: input1, ...options }"></Input>
</template>

<script>
export default {
  name: 'MyExample',
  props: {
    options: Object
  },
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
