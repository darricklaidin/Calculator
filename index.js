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



// Add event listener to all numpad buttons
numpadButtonElements.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Get value of button
        let buttonValue = event.target.textContent;
        console.log("Button clicked:", buttonValue);
        
        // Check if button is clear button -> yes
        if (buttonValue === 'C') {
            clear();
        }
            
        // Check if current state is waitFirstOperand -> yes
        if (currentState === 'waitFirstOperand') {
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
                // Set current state to waitOperator
                // Update otherOperand variable
                // Update operator variable
                // Move current operand to other operand in display
                // Update operator in display
                // Set current operand to 0
                // Set current operand display to 0
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
            // Check if button is equals -> yes
            else if (buttonValue === '=') {
                // Update equals result symbol display
                equalsResultSymbolElement.textContent = '=';
                // Update current operand
                currentOperand = Number(currentOperand);
                // Update current operand display
                currentOperandElement.textContent = currentOperand;
                // Set current state to showResult
                currentState = 'showResult';
            }
        }
        
        // Check if current state is waitOperator -> yes
            // Check if button is an operator -> yes
                // Replace the existing operator
                // Update operator in display
            // Check if button is a number -> yes
                // Set current state to waitSecondOperand
                // Execute waitSecondOperand function
                
        // Check if current state is waitSecondOperand -> yes
            // Check if button is a number -> yes
                // Add value to current operand
                // currentOperand = Number(currentOperand + buttonValue);
                // Update current operand
                // currentOperandElement.textContent = currentOperand;
            // Check if button is a decimal dot -> yes
                // Check if current operand already has a decimal dot -> yes
                    // Do nothing
                // Check if current operand already has a decimal dot -> no
                    // Set state to waitDecimalDigits
                    // Add decimal dot to current operand
                    // Any number after decimal dot will be added to current operand as decimal digits (i.e. 5 + 0.5125151)
            // Check if button is an operator -> yes
                // Set current state to waitOperator
                // Update otherOperand variable (current operand + other operand)
                // Update operator variable
                // Move current operand to other operand in display
                // Update operator in display
                // Set current operand to 0
                // Set current operand display to 0
            // Check if button is equals -> yes
                // Set current state to showResult
                // Show equals result symbol
                // Execute showResult function
            // Check if button is backspace -> yes
                // Check if current operand is 0 -> yes
                        // Do nothing
                    // Check if current operand is 0 -> no
                        // Check if current operand is one digit -> yes
                            // Set current operand to 0
                            // Update current operand display to 0
                        // Check if current operand is one digit -> no
                            // Remove last digit from current operand
                            // Update current operand
                            // Update current operand display
                
            // Check if button is plus/minus -> yes
                // Multiply current operand by -1
                // Update current operand
                // Update current operand display
           
                
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

// Backspace:
    // If currently showing operand, clicking on backspace will remove last digit
    
    // If currently showing result, clicking on backspace will perform same function as clear
    // If operand is now 0 and is in waitSecondOperand, clicking on backspace will remove the current operator and bring the other operand to the current operand
    // If current character is a decimal, clicking on backspace will remove the decimal

// Operators:
    // Clicking on an operator will override the previous operator