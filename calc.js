// call buttons and results screen from HTML
const buttons = document.querySelectorAll('.butn');
const operationInCurse = document.getElementById('operInCurse');
const displayedResult = document.getElementById('buttonOperation');
const correction = document.getElementById('buttonCorrection');
const resultFrame = document.getElementById('result');
const buttonClear = document.getElementById('buttonClear');

// array where typed values are stored
let arrayInCurse = [];

// range of numbers
const NUMBER_REGEX = /[0-9.]/;

// previous value typed
let previousElement = null;

// values and operators displayed
let screenContent = '';


// button clicks call the element on them
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayLabel(button.innerHTML);
  }); 
});


// each click sends its value in an array
function displayLabel(labelButton) {
  if (arrayInCurse.length === 0 && !NUMBER_REGEX.test(labelButton)) {
    return;
  }
  if (arrayInCurse.length > 0 && !NUMBER_REGEX.test(arrayInCurse[arrayInCurse.length - 1]) && !NUMBER_REGEX.test(labelButton)) {
    return;
  }
  arrayInCurse.push(labelButton);
  console.log(arrayInCurse);
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

// function identify operator, merge numbers and execute loop to operate adequate operator on the neighboring numbers and return result
function applyOperations() {
  let numbers = [];
  let currentNumber = "";
  let operators = [];

  if (!NUMBER_REGEX.test(arrayInCurse[arrayInCurse.length - 1])) {
    arrayInCurse.pop();
  }

  for (let i = 0; i < arrayInCurse.length; i++) {
    if (NUMBER_REGEX.test(arrayInCurse[i])) {
      currentNumber += arrayInCurse[i];
    } else if (arrayInCurse[i] === '+' || arrayInCurse[i] === '-' || arrayInCurse[i] === '*' || arrayInCurse[i] === '/') {
      numbers.push(parseFloat(currentNumber));
      currentNumber = "";
      operators.push(arrayInCurse[i]);
    }
  }
  numbers.push(parseFloat(currentNumber));

  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    result = operate(result, numbers[i + 1], operators[i]);
  }
  console.log(result);
}

// operation is applied when the button is clicked
displayedResult.addEventListener("click", () => { 
  applyOperations();
});

// window.addEventListener('keydown', (event) => {
//   const keyCode = event.code;
//   const button = document.querySelector(`button[data-key="${keyCode}"]`);
//   if(button) {
//     displayLabel(button.innerHTML);
//   }
// });

// Clear button empties the array and wipes out all displayed values
function clear() {
  arrayInCurse = [];
}

buttonClear.addEventListener('click', () => {
  clear();
});

// correct button removes the last typed operator or number
function handleCorrection() {
  arrayInCurse.pop();
  console.log(arrayInCurse);
}

correction.addEventListener("click", () => { 
  handleCorrection();
});