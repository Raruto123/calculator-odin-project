
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
let screenDisplay = document.getElementsByClassName("display")[0];
let commaButton = document.getElementsByClassName("comma")[0];
let firstItem = "";//1er opérande
let secondItem = "";//2eme opérande
let currentOperator = null;//l'Opérateur du calcul actuel
let isSecondItem = false;//Savoir si le deuxième nombre est entrain d'être entré
screenDisplay.textContent = "0";



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
function displayOperatorsOnScreen(operator) {
    screenDisplay.textContent = operator
}

//to be able to click on the buttons
function iteration(button) {

    for(let i = 0; i < button.length; i++ ){
        button[i].addEventListener("click", (event) => {   
            displayNumbersOnScreen(event.target.value)
            console.log(`%c🎨 ⍨ lol`, "Your_CSS_Goes_Here")
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
    let result = operate(num1, num2, currentOperator);

    // Afficher le résultat
    screenDisplay.textContent = result;

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
                console.log("you done goofed")
        }
    }
}

basculateToSecondItem()

function addCommaToNumbers(comma) {
    screenDisplay.textContent += comma
    firstItem += comma
}

// function eraseCommaToNumbers(comma) {
//     screenDisplay.textContent.replace(comma, "")
//     firstItem.replace(comma, "")
// }

function restrictionToCommas() {
    if(firstItem.startsWith("", 0)) {
        addCommaToNumbers("0.")
        if (firstItem.includes(".")) {
            console.log(`%c🎨 ⍨ `, "Your_CSS_Goes_Here")
            commaButton.removeEventListener("click", restrictionToCommas)
        }
    }

}

commaButton.addEventListener("click", restrictionToCommas)

function clearAll(){
    firstItem = "";
    secondItem = "";
    currentOperator = null;
    isSecondItem = false;
    screenDisplay.textContent = "0";
}

acButton.addEventListener("click", () => clearAll())

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