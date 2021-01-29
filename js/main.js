const keys = document.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", event => {
    if(!event.target.closest("button")) return;

    const key = event.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    
    if(displayValue === "0"){
        display.textContent = keyValue;
    }else{
        display.textContent = displayValue + keyValue;
    }
    
    // console.log(displayValue);

});