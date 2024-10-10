let beAdd = false;
let beMinus = false;
let beMultiply = false;
let beDivide = false;
let calculatorButtons = {
    numbers : document.getElementsByClassName("numbers"),
    operators : document.getElementsByClassName("operators"),
    comma : document.getElementsByClassName("comma"),
    aczpercentage : document.getElementsByClassName("ac-z-percentage")
}
let screenDisplay = document.getElementsByClassName("display")[0];
let firstItem = "";//1er opérande
let secondItem = "";//2eme opérande
let currentOperator = null;//l'Opérateur du calcul actuel
let isSecondItem = false;//Savoir si le deuxième nombre est entrain d'être entré


//to see on the display the buttons pressed
function displayNumbersOnScreen(value) {
    // displayValue += value;
    // screenDisplay.textContent += value;
    if (!isSecondItem) {
        firstItem += value;
        screenDisplay.textContent += value;
    } else {
        secondItem += value;
        screenDisplay.textContent += value
    }
}
function displayOperatorsOnScreen(value) {
    screenDisplay.textContent += value
}

//to be able to click on the buttons
function iteration(button) {

    for(let i = 0; i < button.length; i++ ){
        button[i].addEventListener("click", (event) => {   
            displayNumbersOnScreen(event.target.value)
            console.log(`%c🎨 ⍨ ${firstItem}`, "font-size:30px;color:red");
            console.log(`%c🎨 ⍨ ${secondItem}`, "font-size:30px;color:blue")
            // addToFirstItem(calculatorButtons.numbers[i])
        });
    }
}


iteration(calculatorButtons.numbers);
// iteration(calculatorButtons.operators);
// iteration(calculatorButtons.comma);
// iteration(calculatorButtons.aczpercentage);

function basculateToSecondItem() {

    for(let i = 0; i < calculatorButtons.operators.length; i++) {
        let iteration = calculatorButtons.operators[i];
        if(iteration.value === "+") {
            iteration.addEventListener("click", (event) => {
                addOperation();
                displayOperatorsOnScreen(event.target.value)
                console.log(`%c🎨 ⍨ success`, "color:purple");
                console.log(`%c🎨 ⍨ ${isSecondItem}`, "color:orange")
            });
        }
    }
}

basculateToSecondItem()

// console.log(`%c🎨 ⍨ calculatorButtons.operators[+]`, "color:green; font-weight:bold", calculatorButtons.operators[0]);


function addOperation() {
    beAdd  = true;
    beMinus = false;
    beDivide = false;
    beMultiply = false;
    isSecondItem = true;

};

function minusOperation() {
    beMinus = true;
    beAdd = false;
    beMultiply = false;
    beDivide = false;
    isSecondItem = true;


}

function multiplyOperation() {
    beMultiply = true;
    beAdd = false;
    beMinus = false;
    beDivide = false;
    isSecondItem = true;

}

function divideOperation() {
    beDivide = true;
    beMultiply = false;
    beAdd = false;
    beMinus = false;
    isSecondItem = true;


}

function operate(itemOne, itemTwo, operator) {

    let results;
    if (beMinus) {
        return results = itemOne - itemTwo
    } else if (beAdd) {
        return results = itemOne+itemTwo
    } else if (beMultiply) {
        return results = itemOne * itemTwo
    } else if (beDivide) {
        return results = itemOne/itemTwo
    }

    return results;
}
