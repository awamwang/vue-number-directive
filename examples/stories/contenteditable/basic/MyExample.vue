<template>
  <NumberWrap ref="wrap">
    <label for="input1">input1: contenteditable</label>
    <p
      name="input1"
      v-model="input1"
      v-number="{ ...$props }"
      contenteditable
      @focus="onFocus"
    >
      {{ input1 }}
    </p>

    <label for="input2">input2: contenteditable=true</label>
    <p
      name="input2"
      v-model="input2"
      v-number="{ ...$props }"
      contenteditable="true"
      @focus="onFocus"
    >
      {{ input2 }}
    </p>
  </NumberWrap>
</template>

<script>
import { Input } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInput: Input },
  data() {
    return {
      input1: '123',
      input2: '123'
    }
  }
}
</script>