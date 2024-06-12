<template>
  <div id="app">
    <input type="text" v-model="display" readonly>
    <div class="buttons">
      <button v-for="button in buttons" :key="button" @click="addToDisplay(button)">{{ button }}</button>
      <button @click="clearDisplay">C</button>
      <button @click="calculate">=</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: "",
      buttons: ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", ".", "/"]
    }
  },
  methods: {
    addToDisplay(button) {
      this.display += button;
    },
    clearDisplay() {
      this.display = "";
    },
    calculate() {
      try {
       
        const result = Function('"use strict"; return (' + this.display + ')')();
        this.display = String(result);
      } catch (error) {
        this.display = "Error";
      }
    }
  }
}
</script>

<style>

</style>