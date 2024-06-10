<script>
  export default {
    data(){
      return {
      currentDisplay: "",
      buttons: ["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", ".", "/"]
      }
    },
    methods: {
      addToDisplay(button) {
      this.currentDisplay += button;
    },
    clearcurrenteDisplay() {
      this.currentDisplay = "";
    },
    calculate() {
      try {
        this.currentDisplay = eval(this.currentDisplay);
      } catch (error) {
        this.currentDisplay = "Error";
        }
      }
    }
  }

</script>

<template>
  <input type="text" v-model="currentDisplay" readonly> 
  <div class="buttons">
    <button v-for="button in buttons" :key="button" @click="addToDisplay(button)">{{ button}}</button>
    <button @click="clearcurrenteDisplay">C</button>
    <button @click="calculate">=</button>
  </div>
  </template>

<style>
button{
  width: 20em;
  height: 5em;
}

currentDisplay{
  width: 20em;
  height: 5em;
}
</style>