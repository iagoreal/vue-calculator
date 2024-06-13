<template>
  <div id="App">
    <input type="text" :value="display" readonly>
    <div class="buttons">
      <button v-for="button in buttons" :key="button" @click="onButtonClick(button)">
        {{ button }}
      </button>
      <button @click="onClearDisplay">C</button>
      <button @click="onCalculate">=</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { initialState, handleButtonClick, clearDisplay, calculate } from './calculator';

export default defineComponent({
  name: 'Calculator',
  data() {
    return {
      state: { ...initialState },
      buttons: ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", ".", "/"]
    };
  },
  computed: {
    display(): string {
      return this.state.display;
    }
  },
  methods: {
    onButtonClick(button: string) {
      this.state = handleButtonClick(this.state, button);
    },
    onClearDisplay() {
      this.state = clearDisplay();
    },
    onCalculate() {
      this.state = calculate(this.state);
    }
  }
});
</script>

<style scoped>

</style>