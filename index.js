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
            // Update current operand display
            operandElement.textContent = operand.slice(0, 13);
        } else {
            operand = operand.slice(1);
            operandElement.textContent = operand.slice(0, 12);
        }
        
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

let waitOperand = (event, buttonValue, passThroughKeyPress) => {
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
    if ((event.target.classList.contains('operator') || passThroughKeyPress)
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
        currentOperandElement.textContent = currentOperand.slice(0, 12);
        // Set current state to showResult
        currentState = 'showResult';
    }
};

let waitOperator = (event, buttonValue, passThroughKeyPress) => {
    // Check if button is an operator -> yes
    if ((event.target.classList.contains('operator') || passThroughKeyPress) 
        && buttonValue !== '=' 
        && buttonValue !== '+/-') {
            // Update operator variable
            operator = buttonValue;
            // Update operator display
            operatorElement.textContent = operator;
    } else {
        // Set current state to waitSecondOperand
        currentState = 'waitSecondOperand';
        waitOperand(event, buttonValue, passThroughKeyPress);
    }
};

let runCalculator = (event) => {
    let passThroughKeyPress = false;
    // Get value of button
    let buttonValue = null;
    if (event.type === 'keydown') {
        buttonValue = event.key;  // 1, 2, 3, ..., +, -, =, n, enter, backspace, escape
        if (buttonValue === 'Enter') {
            buttonValue = '=';
        } else if (buttonValue === 'Escape' || buttonValue === 'c') {
            buttonValue = 'C';
        }
        else if (buttonValue === 'n') {
            buttonValue = '+/-';
        }
        else if (buttonValue === 'Backspace' || buttonValue === 'Delete') {
            buttonValue = '⌫';
        }
        else if (buttonValue === '-' || buttonValue === '+' || buttonValue === '*' || buttonValue === '/' || buttonValue === '%') {
            if (buttonValue === '*') {
                buttonValue = 'x';
            }
            else if (buttonValue === '/') {
                buttonValue = '÷';
            }
            passThroughKeyPress = true;
        }
    }
    else if (event.type === 'click') {
        buttonValue = event.target.textContent;
    }
    
    if (currentState === 'error') {
        clear();
        return;
    }
    
    // Check if button is clear button -> yes
    if (buttonValue === 'C') {
        clear();
        return;
    }
    
    // Check if current state is waitFirstOperand -> yes
    if (currentState === 'waitFirstOperand' || currentState === 'waitSecondOperand') {
        waitOperand(event, buttonValue, passThroughKeyPress);
    }
    
    // Check if current state is waitOperator -> yes
    if (currentState === "waitOperator") {
        waitOperator(event, buttonValue, passThroughKeyPress);
    }
            
    // Check if current state is showResult -> yes
    if (currentState === "showResult") {
        if (buttonValue === '=') return;
        
        // Hide equals result symbol
        equalsResultSymbolElement.textContent = '';
        
        if ((event.target.classList.contains('operator') || passThroughKeyPress) 
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
            return;
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
            return;
        }
    }  
};

let toggleButtonActive = (event) => {
    if (event.key === 'Enter' || event.key === '=') {
        if (event.type === 'keydown') {
            equalsButtonElement.classList.add('equals-button-activated');
        } else if (event.type === 'keyup') {
            equalsButtonElement.classList.remove('equals-button-activated');
        }
    } else if (event.key === 'Escape' || event.key === 'c') {
        if (event.type === 'keydown') {
            clearButtonElement.classList.add('clear-button-activated');
        } else if (event.type === 'keyup') {
            clearButtonElement.classList.remove('clear-button-activated');
        }
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
        if (event.type === 'keydown') {
            backspaceButtonElement.classList.add('backspace-button-activated');
        } else if (event.type === 'keyup') {
            backspaceButtonElement.classList.remove('backspace-button-activated');
        }
    } else {
        switch (event.key) {
            case '0':
                if (event.type === 'keydown') {
                    zeroButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    zeroButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '1':
                if (event.type === 'keydown') {
                    oneButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    oneButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '2':
                if (event.type === 'keydown') {
                    twoButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    twoButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '3':
                if (event.type === 'keydown') {
                    threeButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    threeButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '4':
                if (event.type === 'keydown') {
                    fourButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    fourButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '5':
                if (event.type === 'keydown') {
                    fiveButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    fiveButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '6':
                if (event.type === 'keydown') {
                    sixButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    sixButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '7':
                if (event.type === 'keydown') {
                    sevenButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    sevenButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '8':
                if (event.type === 'keydown') {
                    eightButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    eightButtonElement.classList.remove('numpad-button-activated');
                }
                break;
                    
            case '9':
                if (event.type === 'keydown') {
                    nineButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    nineButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '.':
                if (event.type === 'keydown') {
                    decimalButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    decimalButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '+':
                if (event.type === 'keydown') {
                    addButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    addButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '-':
                if (event.type === 'keydown') {
                    subtractButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    subtractButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '*':
                if (event.type === 'keydown') {
                    multiplyButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    multiplyButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '/':
                if (event.type === 'keydown') {
                    divideButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    divideButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case '%':
                if (event.type === 'keydown') {
                    moduloButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    moduloButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            case 'n':
                if (event.type === 'keydown') {
                    setSignButtonElement.classList.add('numpad-button-activated');
                } else if (event.type === 'keyup') {
                    setSignButtonElement.classList.remove('numpad-button-activated');
                }
                break;
            default:
                break;
        }
        
    }
};

onkeydown = (event) => {
    toggleButtonActive(event);
    runCalculator(event);
};

onkeyup = (event) => {
    toggleButtonActive(event);
};
    
// Add event listener to all numpad buttons
numpadButtonElements.forEach((button) => {
    button.addEventListener('click', (event) => {
        runCalculator(event);       
    });
});
