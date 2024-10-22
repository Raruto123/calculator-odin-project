
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
let acButton = document.getElementsByClassName("ac")[0];
let commaButton = document.getElementsByClassName("comma")[0];
let screenElements = document.getElementById("calculator-display").children
let displayFirstItem = screenElements[0]
let displayOperator = screenElements[1]
let displaySecondItem = screenElements[2]
let firstItem = "0";//1er opérande
let secondItem = "0";//2eme opérande
let currentOperator = null;//l'Opérateur du calcul actuel
let isSecondItem = false;//Savoir si le deuxième nombre est entrain d'être entré
let isPressed = false;
displayFirstItem.textContent = ""
displaySecondItem.textContent = ""
displayOperator.textContent = ""



//to see on the display the buttons pressed
function displayNumbersOnScreen(value) {
    // displayValue += value;
    // screenDisplay.textContent += value;
    if (!isSecondItem) {
        firstItem += value;
        displayFirstItem.textContent += value;
    } else {
        secondItem += value;
        displaySecondItem.textContent += value
    }
}
function displayOperatorsOnScreen(operator) {
    if (operator) {
        displayOperator.textContent = operator
    }
}

//to be able to click on the buttons
function iteration(button) {

    for(let i = 0; i < button.length; i++ ){
        button[i].addEventListener("click", (event) => {   
            displayNumbersOnScreen(event.target.value)
            console.log(`%c🎨 ⍨ ${firstItem}`, "font-size:30px;color:red");
            console.log(`%c🎨 ⍨ ${secondItem}`, "font-size:30px;color:blue")
        });
    }
}

iteration(calculatorButtons.numbers);

function calculate() {
    if (firstItem === "" || secondItem === "" || currentOperator === null) return;
    if (firstItem && beDivide && secondItem === "0") {
        return alert("La division par 0 est impossible! Ressaisis-toi.")
    }
    
    // Convertir les valeurs en nombres
    let num1 = parseFloat(firstItem);
    let num2 = parseFloat(secondItem);

    // Appeler la fonction operate
    let result = operate(num1, num2, currentOperator).toFixed(2);

    // Afficher le résultat
    displayFirstItem.textContent = result;
    displayOperator.textContent = "";
    displaySecondItem.textContent = "";


    // Réinitialiser les variables
    firstItem = result.toString();  // Le résultat devient le premier nombre pour de futures opérations
    secondItem = "";
    currentOperator = null;
    isSecondItem = false;
}

function basculateToSecondItem() {

    for(let i = 0; i < calculatorButtons.operators.length; i++) {
        let iteration = calculatorButtons.operators[i];
        switch (iteration.value) {
            case "+" :
                iteration.addEventListener("click", (event) => {
                    currentOperator = addOperation();
                    displayOperatorsOnScreen(event.target.value)
                    console.log(`%c🎨 ⍨ success`, "color:purple");
                    console.log(`%c🎨 ⍨ ${isSecondItem}`, "color:orange")
                });
                break;
            case "-" :
                iteration.addEventListener("click", (event) => {
                    currentOperator = minusOperation();
                    displayOperatorsOnScreen(event.target.value)
                    console.log(`%c🎨 ⍨ success`, "color:purple");
                    console.log(`%c🎨 ⍨ ${isSecondItem}`, "color:orange")
                });
                break;
            case "x":
                iteration.addEventListener("click", (event) => {
                    currentOperator = multiplyOperation();
                    displayOperatorsOnScreen(event.target.value)
                    console.log(`%c🎨 ⍨ success`, "color:purple");
                    console.log(`%c🎨 ⍨ ${isSecondItem}`, "color:orange")
                });
                break;
            case "÷" :
                iteration.addEventListener("click", (event) => {
                    currentOperator = divideOperation();
                    displayOperatorsOnScreen(event.target.value)
                    console.log(`%c🎨 ⍨ success`, "color:purple");
                    console.log(`%c🎨 ⍨ ${isSecondItem}`, "color:orange")
                });
                break;
            case "" :
                iteration.addEventListener("click", () => calculate());
                break;
            default:
                console.log("No corresponding value found");
        }
    }
}

basculateToSecondItem()

function addCommaToFirstItem(comma) {
    displayFirstItem.textContent += comma
    firstItem += comma
}

function addCommaToSecondItem(comma) {
    displaySecondItem.textContent += comma
    secondItem += comma
}

function restrictionToCommas() {

    if (!isSecondItem) {
            //verifier le first item en 1er
    if (firstItem.includes(".")) {
        console.log(`%c🎨 ⍨ point`, "Your_CSS_Goes_Here");
        // commaButton.removeEventListener("click", restrictionToCommas);
    } else {
        addCommaToFirstItem(".")
        console.log(`%c🎨 ⍨ no point`, "Your_CSS_Goes_Here");
    }
    } else {
            //passer à la vérification de second item en second lieu
    if (secondItem.includes(".")) {
        console.log(`%c🎨 ⍨ point`, "Your_CSS_Goes_Here");
        // commaButton.removeEventListener("click", restrictionToCommas);
    } else {
        addCommaToSecondItem(".")
        console.log(`%c🎨 ⍨ no point`, "Your_CSS_Goes_Here");
    }
    }

}

commaButton.addEventListener("click", restrictionToCommas)

function clearAll(){
    if(isPressed) {
        firstItem = "0";
        secondItem = "0";
        currentOperator = null;
        isSecondItem = false;
        displayFirstItem.textContent = "";
        displaySecondItem.textContent = "";
        displayOperator.textContent = "";
    }
    isPressed = false
}

acButton.addEventListener("mouseenter", () => isPressed = true);
acButton.addEventListener("mousedown", () => clearAll());


function addOperation() {
    if (firstItem === "") return; // S'assurer que le premier nombre est entré
    beAdd  = true;
    beMinus = false;
    beDivide = false;
    beMultiply = false;
    isSecondItem = true;

};

function minusOperation() {
    if (firstItem === "") return; // S'assurer que le premier nombre est entré

    beMinus = true;
    beAdd = false;
    beMultiply = false;
    beDivide = false;
    isSecondItem = true;


}

function multiplyOperation() {
    if (firstItem === "") return; // S'assurer que le premier nombre est entré

    beMultiply = true;
    beAdd = false;
    beMinus = false;
    beDivide = false;
    isSecondItem = true;

}

function divideOperation() {
    if (firstItem === "") return; // S'assurer que le premier nombre est entré

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