<template>
  <div>
    <p>modifier: int</p>
    <input v-model="input1" v-number.int="{ model: input1, ...options }" />

    <p>modifier: pos</p>
    <input v-model="input1" v-number.pos="{ model: input1, ...options }" />

    <p>modifier: integer</p>
    <input v-model="input1" v-number.integer="{ model: input1, ...options }" />

    <p>modifier: positive</p>
    <input v-model="input1" v-number.positive="{ model: input1, ...options }" />
  </div>
</template>

<script>
export default {
  name: 'MyExample',
  props: {
    options: Object
  },
  data() {
    return {
      input1: '123',
    }
  },
  methods: {
    btnClick() {
      this.$emit('btnClick', this.text)
    }
  }
}
</script>
