// display numbers and operators on the calculator display div

const buttons = document.querySelectorAll('.butn');

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const operationInCurse = document.getElementById('operInCurse');
        const labelButton = button.innerHTML;
        operationInCurse.innerHTML = labelButton;
    })
})


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

function operation(a, b) {
    
}

    console.log(divide(2, 3));