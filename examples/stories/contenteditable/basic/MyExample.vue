<template>
  <div>
    <label for="input1">input1: contenteditable</label>
    <p
      name="input1"
      v-model="input1"
      v-number="{ ...options, integer: int, positive: pos }"
      contenteditable
    >
      {{ input1 }}
    </p>

    <label for="input2">input2: contenteditable=true</label>
    <p
      name="input2"
      v-model="input2"
      v-number="{ ...options, integer: int, positive: pos }"
      contenteditable="true"
    >
      {{ input2 }}
    </p>
    <!-- <p>Modified value in Vue data: {{ input1 }}</p>
    <br />
    <p>local option: FR ; Options: {{ config2 }}</p>
    <label for="input2">input2: </label>
    <p name="input2" id="input2" v-number="config2" contenteditable>
      {{ input2.num }}
    </p>
    <p>Modified value in Vue data: {{ input2 }}</p> -->
  </div>
</template>

<script>
import { Input } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInput: Input },
  props: ['int', 'pos', 'options'],
  data() {
    return {
      input1: '123',
      input2: '123'
    }
  },
  methods: {}
}
</script>