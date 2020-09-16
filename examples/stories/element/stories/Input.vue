<template>
  <input v-number="{ model: input1 }" @click="action" />
</template>

<script>
export default {
  name: 'MyButton',
  data() {
    return {
      input1: ''
    }
  },
  methods: {
    btnClick() {
      this.$emit('btnClick', this.text)
    }
  }
}
</script>