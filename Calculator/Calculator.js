const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentValue = '';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;
let expression = '';
let operatorPressed = false;  

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (value === '±') {
            toggleSign();
        } else if ('+-×/%'.includes(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
        updateDisplay();
    });
});

function clear() {
    currentValue = '';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    expression = '';
    operatorPressed = false;  
    display.textContent = '0';
}

function handleNumber(num) {
    if (shouldResetDisplay) {
        currentValue = '';
        expression = '';
        shouldResetDisplay = false;
    }
    if (num === '.' && currentValue.includes('.')) return;
    currentValue += num;
    expression += num;
    operatorPressed = false;  
}

function handleOperator(op) {
    if (operatorPressed) return;  
    if (currentValue === '' && previousValue === '') return; 

    if (previousValue !== '' && currentValue !== '' && !shouldResetDisplay) {
        calculate();
    }

    operation = op;
    previousValue = currentValue;
    currentValue = '';
    expression += ` ${op} `;
    shouldResetDisplay = false;
    operatorPressed = true;  
}

function calculate() {
    if (previousValue === '' || currentValue === '') return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    expression = result.toString();
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
    operatorPressed = false;  
}

function updateDisplay() {
    display.textContent = expression || currentValue || '0';
}

function toggleSign() {
    if (currentValue) {
        currentValue = (parseFloat(currentValue) * -1).toString();
        expression = expression.slice(0, expression.length - currentValue.length) + currentValue;
    }
}
