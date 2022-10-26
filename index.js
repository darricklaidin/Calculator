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
let operator;

// store current state (only can be one state at a time)
// waitFirstOperand, waitOperator, waitSecondOperand, showResult
let currentState = 'waitFirstOperand';

let clear = () => {
    // Set current operand to 0
    currentOperand = "0";
    // Set other operand to 0
    otherOperand = "0";
    // Set operator to null
    operator = null;
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
        // Check if current operand does not contain a decimal dot -> yes
        if (currentOperand.indexOf('.') === -1) {
            // Update current operand
            currentOperand += buttonValue;
            // Update current operand display
            currentOperandElement.textContent = currentOperand;
        }
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
        // Check if other operand area is going to overflow -> yes
        if (otherOperand.length >= 38) {
            otherOperand = "Error";
            // set to error state
            currentState = 'error';
            return;
        }
        // Update operator variable
        operator = buttonValue;
        // Set current state to waitOperator
        currentState = 'waitOperator';
        // Move current operand to other operand in display
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
        if (currentOperand !== "0") {
            // Prepend/Remove "-" to the current operand
            if (currentOperand.indexOf('-') === -1) {
                currentOperand = "-" + currentOperand;
                // Update current operand display
                currentOperandElement.textContent = currentOperand;
            } else {
                currentOperand = currentOperand.slice(1);
                // Update current operand display
                currentOperandElement.textContent = currentOperand;
            }
        }
    }
    // Check if button is equals -> yes
    else if (buttonValue === '=') {
        // Update equals result symbol display
        equalsResultSymbolElement.textContent = '=';
        if (currentState === 'waitFirstOperand') {
            // Update current operand
            currentOperand = Number(currentOperand);
        } else if (currentState === 'waitSecondOperand') {
            // Update current operand by performing operation on other operand and current operand
            currentOperand = performOperatorOn(operator, currentOperand);
        }
        // Update current operand display
        currentOperandElement.textContent = currentOperand;
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
        console.log("Button clicked:", buttonValue);
        
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
            // Check if button is a number -> yes
                // Hide equals result symbol
                // Set current state to waitFirstOperand
                // Execute waitFirstOperand function
            // Check if button is a decimal dot -> yes
                // Hide equals result symbol
                // Set current state to waitFirstOperand
                // Execute waitFirstOperand function
            // Check if button is an operator -> yes
                // Hide equals result symbol
                // Set other operand to result (current operand)
                // Update other operand display
                // Update operator display
                // Set operator to button value
                // Set current state to waitOperator
                // Execute waitOperator function
            // Check if button is equals -> yes 
                // Do nothing
            // Check if button is backspace -> yes
                // Do nothing
            // Check if button is plus/minus -> yes
                // Multiply current operand by -1
                // Update current operand
                // Update current operand display
                
            
    });
});

// Showing result:
    // Equals symbol will be displayed in current operator area
    // If currently showing result, clicking a number will reset all operands and operators and start a new calculation
    // If currently showing result, clicking on backspace will perform same function as clear

// Optional: If operand is now 0 and is in waitSecondOperand, clicking on backspace will remove the current operator and bring the other operand to the current operand
