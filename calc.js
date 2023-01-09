// display numbers and operators on the calculator display div

const buttons = document.querySelectorAll('.butn');
const operationInCurse = document.getElementById('operInCurse');


let arrayInCurse = [];
const NUMBER_REGEX = /[0-9]/;
let previousElement = null;
let screenContent = '';

function displayLabel() {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const labelButton = button.innerHTML;
  
        if (NUMBER_REGEX.test(labelButton)) {
          if (previousElement && previousElement.type === 'number') {
            if (arrayInCurse[arrayInCurse.length - 1].type === 'operator') {
              // add new number to array and update screen
              arrayInCurse.push({ type: 'number', value: Number(labelButton) });
              screenContent += labelButton;
              operationInCurse.innerHTML = screenContent;
            } else {
              // merge numbers and update array and screen
              const mergedNumber = Number(`${previousElement.value}${labelButton}`);
              arrayInCurse.pop();
              arrayInCurse.push({ type: 'number', value: mergedNumber });
              previousElement = { type: 'number', value: mergedNumber };
              screenContent += labelButton;
              operationInCurse.innerHTML = screenContent;
            }
          } else {
            // add new number to array and update screen
            arrayInCurse.push({ type: 'number', value: Number(labelButton) });
            previousElement = { type: 'number', value: Number(labelButton) };
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
      });
    });
  }

displayLabel()

console.log(arrayInCurse);

function clear() {
const buttonClear = document.getElementById('buttonClear');
buttonClear.addEventListener('click', () => {
    if (operationInCurse.innerHTML !== '') {
        operationInCurse.innerHTML = '';
        arrayInCurse.length = null;
        previousElement = null;
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
    const operationInCurse = document.getElementById('operInCurse');
    switch(operator) {
        case "+":
            return add();
        case "-":
            return substract();
        case "*":
            return multiply();
        case "/":
            return divide();
        default:
            throw new Error("Invalid operator");
    }
}