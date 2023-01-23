// call buttons
const buttons = document.querySelectorAll('.butn');
const displayedResult = document.getElementById('buttonOperation');
const correction = document.getElementById('buttonCorrection');
const buttonClear = document.getElementById('buttonClear');

// display typed elements and results
const currentOperation = document.getElementById('operInCurse');
const resultFrame = document.getElementById('result');

// array where typed values are stored
let arrayInput = [];

// range of numbers
const NUMBER_REGEX = /[0-9.]/;

// button clicks call the element on them
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayLabel(button.innerHTML);
  }); 
});

let decimalAllowed = true; // flag to check if decimal point is allowed

// each click sends its value in an array
function displayLabel(labelButton) {
  if (arrayInput.length === 0 && !NUMBER_REGEX.test(labelButton)) {
    return;
  }
  if (arrayInput.length > 0 && !NUMBER_REGEX.test(arrayInput[arrayInput.length - 1]) && !NUMBER_REGEX.test(labelButton)) {
    return;
  }

  // Check if last input is a decimal point and current input is also a decimal point
  if (labelButton === ".") {
    if (!decimalAllowed) {
        return;
    }
    decimalAllowed = false;
  } else if (!NUMBER_REGEX.test(labelButton)) {
    decimalAllowed = true; // reset decimal flag when an operator is entered
  }

  arrayInput.push(labelButton);
  console.log(arrayInput);
  currentOperation.innerHTML = arrayInput.join("");
}

// operation functions
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

// operator general function which call one the specific operation
function operate(a, b, operator) {
  switch(operator) {
    case "+":
        return add(a, b);
    case "-":
        return substract(a, b);
    case "*":
        return multiply(a, b);
    case "/":
        return divide(a, b);
    default:
        throw new Error("Invalid operator");
  }
}

// function identifies operator, merge numbers and execute loop to operate adequate operator on the neighboring numbers and return result
function applyOperations() {
  let numbers = [];
  let currentNumber = "";
  let operators = [];

  // remove the last operator if not followed by any number
  if (!NUMBER_REGEX.test(arrayInput[arrayInput.length - 1])) {
    arrayInput.pop();
  }

  // test if the element is number, if yes, the consecutive numbers are merged
  for (let i = 0; i < arrayInput.length; i++) {
    if (NUMBER_REGEX.test(arrayInput[i])) {
      currentNumber += arrayInput[i];
    } else if (arrayInput[i] === '+' || arrayInput[i] === '-' || arrayInput[i] === '*' || arrayInput[i] === '/') {
      numbers.push(parseFloat(currentNumber));
      currentNumber = "";
      operators.push(arrayInput[i]);
    }
  }
  numbers.push(parseFloat(currentNumber));

  // the loop executes the adequate operation with the neighboring numbers
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '/' && numbers[i + 1] === 0) {
      resultFrame.innerHTML = "Can't divide by zero";
      return;
    }
    result = operate(result, numbers[i + 1], operators[i]);
  }
  console.log(result);
  resultFrame.innerHTML = Math.round(result * 100000) / 100000;
}

// operation is applied when the button is clicked
displayedResult.addEventListener("click", () => { 
  applyOperations();
});

// keyboard allow to type numbers, operators and other features
window.addEventListener('keydown', (event) => {
  let key = event.key;
  if(NUMBER_REGEX.test(key) || key === '+' || key === '-' || key === '*' || key === '/'){
    displayLabel(key);
  }
  if (event.code === 'Enter') {
    applyOperations();
  }
  if (event.code === 'Backspace') {
    handleCorrection();
  }
  if (event.code === 'Delete') {
    clear();
  }
});

// Clear button empties the array and wipes out all displayed values
function clear() {
  arrayInput = [];
  resultFrame.innerHTML = "";
  currentOperation.innerHTML = "";
}

buttonClear.addEventListener('click', () => {
  clear();
});

// correct button removes the last typed operator or number
function handleCorrection() {
  arrayInput.pop();
  currentOperation.innerHTML = arrayInput.join(""); 
  console.log(arrayInput);
}

correction.addEventListener("click", () => { 
  handleCorrection();
});