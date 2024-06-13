
export interface CalculatorState {
    display: string;
    previousValue: any | null;
    currentValue: number | null;
    currentOperator: string | null;
    newInput: boolean;
  }
  
  export const initialState: CalculatorState = {
    display: "0",
    previousValue: "",
    currentValue: null,
    currentOperator: null,
    newInput: true
  };

  function isOperator(char: string): boolean {
    return ['+', '-', '*', '/'].includes(char);
  }
  
  export function handleButtonClick(state: CalculatorState, button: string): CalculatorState {
        
    if (button === "." && state.display.includes(".")){
      return {...state};
  }
    if (isOperator(button)) {
      if (state.newInput && state.currentOperator) {
        
        // Prevent adding another operator if the last input was also an operator
        return {...state, currentOperator: button};
      } else {
        return setOperator(state, button);
      }
    } else {
      if (state.newInput) {
        return { ...state, display: button, newInput: false };
      } else {
        return { ...state, display: state.display + button };
      }
    }
    
  }
  
  export function clearDisplay(): CalculatorState {
    return { ...initialState };
  }
  
  export function calculate(state: CalculatorState): CalculatorState {
    if (state.currentOperator && state.currentValue !== null) {
      const result = performOperation(state.currentOperator, state.currentValue, parseFloat(state.display));
      return {
        ...state,
        display: String(result),
        currentValue: result,
        currentOperator: null,
        newInput: true
      };
    }
    return state ;
  }
  
  function performOperation(operator: string, value1: number, value2: number): number {
    switch (operator) {
      case '+':
        return value1 + value2;
      case '-':
        return value1 - value2;
      case '*':
        return value1 * value2;
      case '/':
        return value1 / value2;
      default:
        return value2;
    }
  }
  
  function setOperator(state: CalculatorState, operator: string): CalculatorState {
    if (state.currentValue === null) {
      return { ...state, currentValue: parseFloat(state.display), currentOperator: operator, newInput: true };
    } else if (!state.newInput) {
      const result = performOperation(state.currentOperator!, state.currentValue, parseFloat(state.display));
      return {
        ...state,
        display: String(result),
        currentValue: result,
        currentOperator: operator,
        newInput: true
      };
    }
    return { ...state, currentOperator: operator, newInput: true };
  }
  
