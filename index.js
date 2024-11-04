
let beAdd = false;
let beMinus = false;
let beMultiply = false;
let beDivide = false;
let calculatorButtons = {
    numbers : document.getElementsByClassName("numbers"),
    operators : document.getElementsByClassName("operators"),
    aczpercentage : document.getElementsByClassName("ac-z-percentage")
}
let acButton = document.getElementsByClassName("ac")[0];
let commaButton = document.getElementsByClassName("comma")[0];
let screenElements = document.getElementById("calculator-display").children;
let displayFirstItem = screenElements[0]
let displayOperator = screenElements[1]
let displaySecondItem = screenElements[2]
let firstItem = "";//1er opérande
let secondItem = "";//2eme opérande
let currentOperator = null;//l'Opérateur du calcul actuel
let isSecondItem = false;//Savoir si le deuxième nombre est entrain d'être entré
let isACPressed = false;
let holdTimer;
displayFirstItem.textContent = "";
displaySecondItem.textContent = "";
displayOperator.textContent = "";
let minusSign = "-";


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
    
    if ( operator === "-" && firstItem === "-")  {
        console.log(`%c🎨 ⍨ display operator wait`, "Your_CSS_Goes_Here");
        displayOperator.textContent = "";
    } else if ((operator === "+" || operator === "x" || operator === "÷" ) && firstItem === "") {
        console.log(firstItem)
        console.log(`%c🎨 ⍨ operator + ou x ou /`, "Your_CSS_Goes_Here");
        displayOperator.textContent = "";
    } else if (operator) {
        displayOperator.textContent = operator;
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
    if (secondItem === ".") return;
    if (firstItem === ".") return;
    if (firstItem.endsWith(minusSign)) return;
    
    // Convertir les valeurs en nombres
    let num1 = parseFloat(firstItem);
    let num2 = parseFloat(secondItem);

    if (displayFirstItem.textContent.includes("(-" + firstItem + ")")) {
        num1 = (-num1)
        console.log(`%c🎨 ⍨ num1`, "color:yellowgreen; font-weight:bold", num1);
    
    } 

    if (displayFirstItem.textContent.includes("%")) {
        let percentage = 1/100;
        num1 *= percentage;
        console.log(num1);
    } else if (displaySecondItem.textContent.includes("%")) {
        let percentage = 1/100;
        num2 *= percentage;
    } else if (displayFirstItem.textContent.includes("%") && displaySecondItem.textContent.includes("%")) {
        let percentage = 1/100;
        num1 *= percentage;
        num2 *= percentage;
    }

    // Appeler la fonction operate
    let result;
    if (firstItem.includes(".") || secondItem.includes(".")) {
        result = operate(num1, num2, currentOperator).toFixed(2);
    } else if((firstItem.includes(".") || secondItem.includes(".")) && beDivide) {
        result = operate(num1, num2, currentOperator).toFixed(2)
    } else {
        result = operate(num1, num2, currentOperator)
    }

    // Afficher le résultat
    displayFirstItem.textContent = result;
    displayOperator.textContent = "";
    displaySecondItem.textContent = "";


    // Réinitialiser les variables
    firstItem = result.toString();  // Le résultat devient le premier nombre pour de futures opérations
    secondItem = "";
    currentOperator = null;
    isSecondItem = false;
    beAdd = false;
    beMultiply = false;
    beDivide = false;
    beMinus = false;
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
    if(isACPressed) {
        firstItem = "";
        secondItem = "";
        currentOperator = null;
        isSecondItem = false;
        displayFirstItem.textContent = "";
        displaySecondItem.textContent = "";
        displayOperator.textContent = "";
    }
    isACPressed = false
}

acButton.addEventListener("mousedown", () => {

    holdTimer = setTimeout(() => {
        isACPressed = true,
        clearAll()
    }, 1000)

});

acButton.addEventListener("mouseup", () => {
    clearTimeout(holdTimer)
});

acButton.addEventListener("mouseleave", () => {
    clearTimeout(holdTimer)
});

function clearOnce() {

    let secondItemLength = secondItem.length;
    let firstItemLength = firstItem.length;
    // if (secondItem) {
    //     console.log(`%c🎨 ⍨ secondItem digit erased`, "Your_CSS_Goes_Here")
    //     // secondItem = secondItem.slice(0, -1);
    //     secondItem = secondItem.replace(secondItem[secondItemLength - 1], "");
    //     displaySecondItem.textContent = secondItem;
    // }
    if((beAdd || beMinus || beDivide || beMultiply) && secondItem) {
        secondItem = secondItem.replace(secondItem[secondItemLength - 1], "");
        displaySecondItem.textContent = secondItem;
    } else if((beAdd || beMinus || beMultiply || beDivide) && secondItem === "") {
        console.log("operator erased");
        beAdd = false;
        beMultiply = false;
        beDivide = false;
        beMinus = false;
        isSecondItem = false;
        displayOperatorsOnScreen(" ");
    } else if (firstItem && (!beAdd || !beMinus || !beMultiply || !beDivide) && secondItem === "") {
        firstItem = firstItem.replace(firstItem[firstItemLength - 1], "");
        displayFirstItem.textContent = firstItem;
        console.log("firstItem erased");
    }
}

acButton.addEventListener("click", () => clearOnce());


function addPercentageToFirstItem(percentage) {
    displayFirstItem.textContent += percentage;
}

function addPercentageToSecondItem(percentage) {
    displaySecondItem.textContent += percentage;
}

function restrictionToPercentages() {
    if (!isSecondItem) {
        //verifier le first item en 1er
        if (displayFirstItem.textContent.includes("%")) {
        console.log(`%c🎨 ⍨ percentage`, "Your_CSS_Goes_Here");
        // commaButton.removeEventListener("click", restrictionToCommas);
    } else {
        addPercentageToFirstItem("%");
        console.log(`%c🎨 ⍨ no percentage`, "Your_CSS_Goes_Here");
    }
    } else {
        //passer à la vérification de second item en second lieu
        if (displaySecondItem.textContent.includes("%")) {
        console.log(`%c🎨 ⍨ percentage`, "Your_CSS_Goes_Here");
        // commaButton.removeEventListener("click", restrictionToCommas);
    } else {
        addPercentageToSecondItem("%");
        console.log(`%c🎨 ⍨ no percentage`, "Your_CSS_Goes_Here");
        }
    }
}

calculatorButtons.aczpercentage[1].addEventListener("click", restrictionToPercentages);

function changingSign() {
    displayFirstItem.textContent = "(-" + firstItem + ")";
}

function changeSign() {
    changingSign()
}


calculatorButtons.aczpercentage[0].addEventListener("click", changeSign);




function addOperation() {

    if (firstItem === "") {
        isSecondItem = false;
        beAdd  = false;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
        //juste coller un moins devant firstItem pas besoin de mettre un autre affichage
        console.log(`%c🎨 ⍨ reached`, "Your_CSS_Goes_Here");
    } else {
        beAdd  = true;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
        isSecondItem = true;
    }; // S'assurer que le premier nombre est entré

};

function minusOperation() {
    if (firstItem === "") {
        isSecondItem = false;
        beMinus = true;
        beAdd = false;
        beMultiply = false;
        beDivide = false;
        firstItem = firstItem.concat(minusSign, firstItem);
        displayFirstItem.textContent = firstItem;
        //juste coller un moins devant firstItem pas besoin de mettre un autre affichage
        console.log(`%c🎨 ⍨ reached`, "Your_CSS_Goes_Here");
    } else {
        beMinus = true;
        beAdd = false;
        beMultiply = false;
        beDivide = false;
        isSecondItem = true;
    }; // S'assurer que le premier nombre est entré


}

function multiplyOperation() {
    if (firstItem === "") {
        isSecondItem = false;
        beAdd  = false;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
        //juste coller un moins devant firstItem pas besoin de mettre un autre affichage
        console.log(`%c🎨 ⍨ reached`, "Your_CSS_Goes_Here");
    } else {
        beMultiply = true;
        beAdd = false;
        beMinus = false;
        beDivide = false;
        isSecondItem = true;
    }; // S'assurer que le premier nombre est entré

}

function divideOperation() {

    if (firstItem === "") {
        isSecondItem = false;
        beAdd  = false;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
        //juste coller un moins devant firstItem pas besoin de mettre un autre affichage
        console.log(`%c🎨 ⍨ reached`, "Your_CSS_Goes_Here");
    } else {
        beDivide = true;
        beMultiply = false;
        beAdd = false;
        beMinus = false;
        isSecondItem = true;
    }; // S'assurer que le premier nombre est entré



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