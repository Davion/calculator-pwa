const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");
const clear = calculator.querySelector(".clear");

keys.addEventListener("click", event => {
    if(!event.target.closest("button")) return;

    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;
    const { isEqual } = calculator.dataset;
    
    // is this a number key
    if(type === "number"){
        if(displayValue === "0" || previousKeyType === "operator" || isEqual === "true"){
            display.textContent = keyValue;
            calculator.dataset.isEqual = false;
        }else{
            display.textContent = displayValue + keyValue;
        }
    }


    //is this an operator key
    if(type === "operator"){
        const operatorKeys = keys.querySelectorAll("[data-type='operator']");
        operatorKeys.forEach(el => { el.dataset.state = "" });
        key.dataset.state = "selected";

        if(calculator.dataset.firstNumber){
            if(previousKeyType !== "operator"){
                const firstNumber = calculator.dataset.firstNumber;
                const operator  = calculator.dataset.operator;
                const secondNumber = displayValue;
                display.textContent = calculate(firstNumber, operator, secondNumber);
            }
        }
        
        calculator.dataset.firstNumber = display.textContent;
        calculator.dataset.operator = key.dataset.key;
        
    }

    if(type === "equal"){
        if(calculator.dataset.firstNumber && previousKeyType === "number"){
            const firstNumber = calculator.dataset.firstNumber;
            const operator  = calculator.dataset.operator;
            const secondNumber = displayValue;
            display.textContent = calculate(firstNumber, operator, secondNumber);
            calculator.dataset.isEqual = true;
            delete calculator.dataset.firstNumber;
            clearSelectedOperator();
        }
    }

    if(type === "clear"){
        display.textContent = "0";
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
        calculator.dataset.isEqual = false;
        clearSelectedOperator();
    }

    calculator.dataset.previousKeyType = type;
});


function calculate(firstNumber, operator, secondNumber){
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    
    if(operator === "plus") return firstNumber + secondNumber;
    if(operator === "minus") return firstNumber - secondNumber;
    if(operator === "times") return firstNumber * secondNumber;
    if(operator === "divide") return firstNumber / secondNumber;
}

function clearSelectedOperator(){
    const selectedOperator = keys.querySelector("[data-state='selected']");
    if(selectedOperator) selectedOperator.dataset.state = "";
}