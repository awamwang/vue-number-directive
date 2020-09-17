<template>
  <input v-model="input1" v-number="{ model: input1, ...options }" />
</template>

<script>
export default {
  name: 'MyButton',
  props: { options, action },
  data() {
    return {
      input1: ''
    }
  },
  methods: {}
}
</script>