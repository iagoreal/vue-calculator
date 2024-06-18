<template>
  <div id="App">
    <input type="text" :value="display" readonly>
    <div class="buttons">
      <button v-for="button in buttons" :key="button" @click="onButtonClick(button)"
              :class="{ 'zero': button === '0', 'equal': button === '=' }">
        {{ button }}
      </button>
      <button @click="onClearDisplay">C</button>
      <button @click="onCalculate" class="equal">=</button>
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
 #App {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
  border: 2px solid #333; /* Adiciona a borda em volta da calculadora */
  border-radius: 10px; /* Borda arredondada */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Adiciona uma leve sombra */
  background-color: #f9f9f9; /* Fundo branco para destaque */
}

#display {
  background-color: #333;
  color: white;
  font-size: 2em;
  width: 100%;
  text-align: right;
  padding: 20px;
  border: 1px solid #666;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"] {
  font-size: 1.5em;
  width: 100%;
  text-align: right;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.2em;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ddd;
}

button:active {
  background-color: #ccc;
}

button:nth-child(4n),
button:nth-child(4n-1),
button:nth-child(4n-2),
button:nth-child(4n-3) {
  width: 100%;
}

/* Especificamente para o botão zero (0) */
button.zero {
  grid-column: span 2;
}

/* Especificamente para o botão de igual (=) */
button.equal {
  grid-column: span 3;
}

</style>