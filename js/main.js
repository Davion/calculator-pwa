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
    
    // is this a number key
    if(type === "number"){
        if(displayValue === "0" || previousKeyType === "operator"){
            display.textContent = keyValue;
        }else{
            display.textContent = displayValue + keyValue;
        }
    }


    //is this an operator key
    if(type === "operator"){
        const operatorKeys = keys.querySelectorAll("[data-type='operator']");
        operatorKeys.forEach(el => { el.dataset.state = "" });
        key.dataset.state = "selected";

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if(type === "equal"){
        const firstNumber = calculator.dataset.firstNumber;
        const operator  = calculator.dataset.operator;
        const secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber);
        clearSelectedOperator();
    }

    if(type === "clear"){
        display.textContent = "0";
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
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
    keys.querySelector("[data-state='selected']").dataset.state = "";
}