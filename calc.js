// call buttons and results screen from HTML
const buttons = document.querySelectorAll('.butn');
const operationInCurse = document.getElementById('operInCurse');
const displayedResult = document.getElementById('buttonOperation');
const correction = document.getElementById('buttonCorrection');
const resultFrame = document.getElementById('result');

// array where typed values are stored
let arrayInCurse = [];

// range of numbers
const NUMBER_REGEX = /[0-9.]/;

// previous value typed
let previousElement = null;

// values and operators displayed
let screenContent = '';

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayLabel(button.innerHTML);
  }); 
});

window.addEventListener('keydown', (event) => {
  const keyCode = event.code;
  const button = document.querySelector(`button[data-key="${keyCode}"]`);
  if(button) {
    displayLabel(button.innerHTML);
  }
});
    
// function that concatenate following numbers to merge them to each other
  
function displayLabel(labelButton) {
  if (NUMBER_REGEX.test(labelButton)) {
    if (previousElement && previousElement.type === 'number') {
      if (arrayInCurse[arrayInCurse.length - 1].type === 'operator') {
        // add new number to array and update screen
        arrayInCurse.push({ type: 'number', value: parseFloat(labelButton) });
        screenContent += labelButton;
        operationInCurse.innerHTML = screenContent;
      } else {
        // merge numbers and update array and screen
        const mergedNumber = parseFloat(`${previousElement.value}${labelButton}`);
        arrayInCurse.pop();
        arrayInCurse.push({ type: 'number', value: mergedNumber });
        previousElement = { type: 'number', value: mergedNumber };
        screenContent += labelButton;
        operationInCurse.innerHTML = screenContent;
      }
    } else {
      // add new number to array and update screen
      arrayInCurse.push({ type: 'number', value: parseFloat(labelButton) });
      previousElement = { type: 'number', value: parseFloat(labelButton) };
      screenContent += labelButton;
      operationInCurse.innerHTML = screenContent;
    }
  } else {
    // add operator to array and update screen
    arrayInCurse.push({ type: 'operator', value: labelButton });
    previousElement = { type: 'operator', value: labelButton };
    screenContent += labelButton;
    operationInCurse.innerHTML = screenContent;
  }
}

// Clear button empties the array and wipes out all displayed values
function clear() {
const buttonClear = document.getElementById('buttonClear');
buttonClear.addEventListener('click', () => {
    if (operationInCurse.innerHTML !== '') {
        operationInCurse.innerHTML = '';
        arrayInCurse = [];
        previousElement = '';
        screenContent = ''
        resultFrame.innerHTML = '';
    };
    });
}

clear();

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
if (operator === '/' && b === 0) {
  return null;
}

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

// the operator is linked to previous and following numbers
function applyOperations() {

console.log(operationInCurse.innerHTML.match(/[-\*\/\+]/g));

console.log(operationInCurse.innerHTML.match(/[^-\*\/\+]+/g));

console.log(arrayInCurse);

  while (arrayInCurse.length > 1) {
    for (let i = 0; i < arrayInCurse.length; i++) {
      const element = arrayInCurse[i];
      if (element.type === 'operator') {
        let operator = element.value;
        let a = arrayInCurse[i-1].value ? parseFloat(arrayInCurse[i - 1].value) : 0;
        let b = arrayInCurse[i+1].value ? parseFloat(arrayInCurse[i + 1].value) : 0;

        const operateResult = operate(a, b, operator);
        if (operateResult === null) {
          resultFrame.innerHTML = "can't divide by zero";
          return;
        }

        let result = Math.round(operate(a, b, operator) * Math.pow(10, 5)) / Math.pow(10, 5);
        arrayInCurse.splice(i-1, 3, { type:'number', value: result });
        resultFrame.innerHTML = result;
      break;
      } 
    }
  }
    operationInCurse.innerHTML = arrayInCurse[0].value;
}

// operation is applied when the button is clicked
displayedResult.addEventListener("click", () => { 
  applyOperations();
});

// correct button removes the last typed operator or number
function handleCorrection() {
  arrayInCurse.pop();
  previousElement = arrayInCurse[arrayInCurse.length - 1];
  screenContent = screenContent.slice(0, -1);
  operationInCurse.innerHTML = screenContent;
}

  correction.addEventListener("click", () => { 
handleCorrection();
});