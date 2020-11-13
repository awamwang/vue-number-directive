<template>
  <div>
    <label for="input1">input1: contenteditable</label>
    <p name="input1" v-model="input1" v-number="{ ...options }" contenteditable @focus="onFocus">
      {{ input1 }}
    </p>

    <label for="input2">input2: contenteditable=true</label>
    <p
      name="input2"
      v-model="input2"
      v-number="{ ...options }"
      contenteditable="true"
      @focus="onFocus"
    >
      {{ input2 }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MyExample',
  data() {
    return {
      input1: '123',
      input2: '123',
    }
  },
}
</script>
