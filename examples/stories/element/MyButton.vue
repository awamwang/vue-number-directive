<template>
  <div>
    <button @click="btnClick">{{ text }}</button>
    <Input v-model="input1" v-number="{ model: input1}"></Input>
  </div>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    text: String
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