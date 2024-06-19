export interface CalculatorState {
  display: string;
  currentValue: number | null;
  currentOperator: string | null;
  newInput: boolean;
}

export const initialState: CalculatorState = {
  display: "0",
  currentValue: null,
  currentOperator: null,
  newInput: true
};

// Function to check if a character is an operator
function isOperator(char: string): boolean {
  return ['+', '-', '*', '/'].includes(char);
}

// Function to handle button click events
export function handleButtonClick(state: CalculatorState, button: string): CalculatorState {
  // Handle decimal point entry
  if (button === "." && state.display.includes(".")) {
    return { ...state };
  }

  // Handle operator button click
  if (isOperator(button)) {
    if (state.newInput && state.currentOperator) {
      // Prevent adding another operator if the last input was also an operator
      return { ...state, currentOperator: button };
    } else {
      return setOperator(state, button);
    }
  } else {
    // Handle number button click
    if (state.newInput) {
      return { ...state, display: button, newInput: false };
    } else {
      return { ...state, display: state.display + button };
    }
  }
}

// Function to clear the display and reset the state
export function clearDisplay(): CalculatorState {
  return { ...initialState };
}

// Function to perform the calculation based on the current operator
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
  return state;
}

// Function to perform the mathematical operation
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

// Function to set the operator and handle the current value
function setOperator(state: CalculatorState, operator: string): CalculatorState {
  if (state.currentValue === null) {
    // First operator press
    return { ...state, currentValue: parseFloat(state.display), currentOperator: operator, newInput: true };
  } else if (!state.newInput) {
    // Subsequent operator press
    const result = performOperation(state.currentOperator!, state.currentValue, parseFloat(state.display));
    return {
      display: String(result),
      currentValue: result,
      currentOperator: operator,
      newInput: true
    };
  }
  // Operator press after result calculation
  return { ...state, currentOperator: operator, newInput: true };
}