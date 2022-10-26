// Get all button elements
let clearButtonElement = document.getElementById('clear');
let equalsButtonElement = document.getElementById('equals');
let backspaceButtonElement = document.getElementById('backspace');
let moduloButtonElement = document.getElementById('modulo');
let addButtonElement = document.getElementById('add');
let subtractButtonElement = document.getElementById('subtract');
let multiplyButtonElement = document.getElementById('multiply');
let divideButtonElement = document.getElementById('divide');
let decimalButtonElement = document.getElementById('decimal-dot');
let setSignButtonElement = document.getElementById('set-sign');
let eightButtonElement = document.getElementById('eight');
let nineButtonElement = document.getElementById('nine');
let sevenButtonElement = document.getElementById('seven');
let sixButtonElement = document.getElementById('six');
let fiveButtonElement = document.getElementById('five');
let fourButtonElement = document.getElementById('four');
let threeButtonElement = document.getElementById('three');
let twoButtonElement = document.getElementById('two');
let oneButtonElement = document.getElementById('one');
let zeroButtonElement = document.getElementById('zero');
// Get numpad button elements as list
let numpadButtonElements = document.querySelectorAll('.numpad > button');

// Get all display elements that will be changed
let otherOperandElement = document.getElementById('other-operand');
let currentOperandElement = document.getElementById('current-operand');
let equalsResultSymbolElement = document.getElementById('equals-result-symbol');
let operatorElement = document.getElementById('operator');

// currentOperand
// otherOperand
// operator
let currentOperand = "0";
let otherOperand = "0";
let operator = "";

// store current state (only can be one state at a time)
// waitFirstOperand, waitOperator, waitSecondOperand, showResult
let currentState = 'waitFirstOperand';

let clear = () => {
    // Set current operand to 0
    currentOperand = "0";
    // Set other operand to 0
    otherOperand = "0";
    // Set operator to ""
    operator = "";
    // Set current state to waitFirstOperand
    currentState = 'waitFirstOperand';
    // Set current operand display to 0
    currentOperandElement.textContent = currentOperand;
    // Set other operand display to empty
    otherOperandElement.textContent = '';
    // Set operator display to empty
    operatorElement.textContent = '';
    // Set equals result symbol display to empty
    equalsResultSymbolElement.textContent = '';
}; 

let performOperatorOn = (operator, operand) => {
    switch (operator) {
        case '+':
            operand = String(Number(otherOperand) + Number(currentOperand));
            break;
        case '-':
            operand = String(Number(otherOperand) - Number(currentOperand));
            break;
        case 'x':
            operand = String(Number(otherOperand) * Number(currentOperand));
            break;
        case '÷':
            operand = String(Number(otherOperand) / Number(currentOperand));
            break;
        case '%':
            operand = String(Number(otherOperand) % Number(currentOperand));
            break;
    }
    return operand;
};

let toggleNegation = (operand, operandElement) => {
    if (operand !== "0") {
        // Prepend/Remove "-" to the operand
        if (operand.indexOf('-') === -1) {
            operand = "-" + operand;
        } else {
            operand = operand.slice(1);
        }
        // Update current operand display
        operandElement.textContent = operand;
    }
    return operand;
};

let addDecimalDot = (buttonValue, operand, operandElement) => {
    // Check if current operand does not contain a decimal dot -> yes
    if (operand.indexOf('.') === -1) {
        // Update current operand
        operand += buttonValue;
        // Update current operand display
        operandElement.textContent = operand;
    }
    return operand
};

let waitOperand = (event, buttonValue) => {
    // Check if button is a number -> yes
    if (buttonValue >= 0 && buttonValue <= 9) {
        // Add value to current operand if length of current operand is less than 12
        if (String(Math.abs(currentOperand)).length < 12) {
            if (currentOperand === "0") {
                currentOperand = buttonValue;
            } else {
                currentOperand += buttonValue;
            }
            // Update current operand
            currentOperandElement.textContent = currentOperand;
        }
    }
    // Check if button is a decimal dot -> yes
    if (buttonValue === '.') {
        currentOperand = addDecimalDot(buttonValue, currentOperand, currentOperandElement);
    }            
    // Check if button is an operator -> yes
    if (event.target.classList.contains('operator') 
        && buttonValue !== '=' 
        && buttonValue !== '+/-') {
        if (currentState === 'waitFirstOperand') {
            otherOperand = currentOperand;
        } else if (currentState === 'waitSecondOperand') {
            // Update otherOperand variable with performing previous operator on currentOperand if current state is waitSecondOperand
            otherOperand = performOperatorOn(operator, otherOperand);
        }
        // Update operator variable
        operator = buttonValue;
        // Set current state to waitOperator
        currentState = 'waitOperator';
        // Move current operand to other operand in display
        // Check if other operand area is going to overflow -> yes
        if (otherOperand.length >= 38) {
            otherOperandElement.textContent = otherOperand.slice(0, 38);
        }
        otherOperandElement.textContent = otherOperand;
        // Update operator in display
        operatorElement.textContent = operator;
        // Set current operand to 0
        currentOperand = "0";
        // Set current operand display to 0
        currentOperandElement.textContent = currentOperand;
    }
    // Check if button is backspace -> yes
    else if (buttonValue === '⌫') {
        // Check if current operand is 0 -> no
        if (currentOperand !== "0") {
            // Check if current operand is one digit -> yes
            if (String(Math.abs(currentOperand)).length === 1) {
                // Set current operand to 0
                currentOperand = "0";
                // Update current operand display to 0
                currentOperandElement.textContent = currentOperand;
            }
            // Check if current operand is one digit -> no
            else {
                // Remove last digit from current operand
                currentOperand = String(currentOperand).slice(0, -1);
                // Update current operand display
                currentOperandElement.textContent = currentOperand;
            }
        }
    }
    // Check if button is plus/minus -> yes
    else if (buttonValue === "+/-") {
        currentOperand = toggleNegation(currentOperand, currentOperandElement);
    }
    // Check if button is equals -> yes
    else if (buttonValue === '=') {
        // Update equals result symbol display
        equalsResultSymbolElement.textContent = '=';
        otherOperandElement.textContent = currentOperand;
        if (currentState === 'waitFirstOperand') {
            // Update current operand
            currentOperand = String(Number(currentOperand));
        } else if (currentState === 'waitSecondOperand') {
            // Update current operand by performing operation on other operand and current operand
            currentOperand = performOperatorOn(operator, currentOperand);
            
        }
        // Update current operand display
        if (String(Math.abs(currentOperand)).length >= 12) {
            currentOperandElement.textContent = currentOperand.slice(0, 12);
        } else {
            currentOperandElement.textContent = currentOperand;
        }
        // Set current state to showResult
        currentState = 'showResult';
    }
};

let waitOperator = (event, buttonValue) => {
    // Check if button is an operator -> yes
    if (event.target.classList.contains('operator') 
        && buttonValue !== '=' 
        && buttonValue !== '+/-') {
        // Update operator variable
        operator = buttonValue;
        // Update operator display
        operatorElement.textContent = operator;
    } else {
        // Set current state to waitSecondOperand
        currentState = 'waitSecondOperand';
        waitOperand(event, buttonValue);
    }
};

// Add event listener to all numpad buttons
numpadButtonElements.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Get value of button
        let buttonValue = event.target.textContent;
        
        if (currentState === 'error') {
            clear();
        }
        
        // Check if button is clear button -> yes
        if (buttonValue === 'C') {
            clear();
        }
        
        // Check if current state is waitFirstOperand -> yes
        if (currentState === 'waitFirstOperand' || currentState === 'waitSecondOperand') {
            waitOperand(event, buttonValue);
        }
        
        // Check if current state is waitOperator -> yes
        if (currentState === "waitOperator") {
            waitOperator(event, buttonValue);
        }
                
        // Check if current state is showResult -> yes
        if (currentState === "showResult") {
            if (buttonValue === '=') return;
            
            // Hide equals result symbol
            equalsResultSymbolElement.textContent = '';
            
            if (event.target.classList.contains('operator') 
                && buttonValue !== '=' 
                && buttonValue !== '+/-') {
                // Update other operand
                otherOperand = currentOperand;
                // Update other operand display
                otherOperandElement.textContent = otherOperand;
                // Update operator variable
                operator = buttonValue;
                // Update operator display
                operatorElement.textContent = operator;
                // Set current operand to "0"
                currentOperand = "0";
                // Update current operand display
                currentOperandElement.textContent = currentOperand;
                // Set current state to waitOperator
                currentState = 'waitOperator';
            }
            else if (buttonValue === "⌫") {
                clear();
            }
            else if (buttonValue === "+/-") {
                equalsResultSymbolElement.textContent = '=';
                currentOperand = toggleNegation(currentOperand, currentOperandElement);
            }
            else if (buttonValue === '.') {
                currentOperand = addDecimalDot(buttonValue, currentOperand, currentOperandElement);
                // Set other operand to "0"
                otherOperand = '';
                // Clear other operand display
                otherOperandElement.textContent = otherOperand;
                // Clear operator
                operator = '';
                // Clear operator display
                operatorElement.textContent = operator;
                // Set current state to waitFirstOperand
                currentState = 'waitFirstOperand';
            }
            else if (buttonValue >= 0 && buttonValue <= 9) {
                clear();
                currentOperand = buttonValue;
                currentOperandElement.textContent = currentOperand;
            }
            
            // Check if button is a number -> yes
                // If currently showing result, clicking a number will reset all operands and operators and start a new calculation
            
        }         
    });
});

// TODO: Configure to work with keyboard