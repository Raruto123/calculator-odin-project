
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
let firstItem = "";//1st operand
let secondItem = "";//2nd operand
let currentOperator = null;//the current calculation operator
let isSecondItem = false;//Know if the second number is being entered
let isACPressed = false;
let holdTimer;
displayFirstItem.textContent = "";
displaySecondItem.textContent = "";
displayOperator.textContent = "";
let minusSign = "-";
let isFirstItemSignChanged = false;
let isSecondItemSignChanged = false;


//to see on the display the buttons pressed
function displayNumbersOnScreen(value) {
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
        displayOperator.textContent = "";
    } else if (
        (operator === "+" || operator === "*" || operator === "/" ) 
        && 
        firstItem === "") {
        displayOperator.textContent = "";
    } else if (operator) {
        displayOperator.textContent = operator;
    }
}

//to be able to click on the digit buttons
function iteration(button) {

    for(let i = 0; i < button.length; i++ ){
        button[i].addEventListener("click", (event) => {   
            displayNumbersOnScreen(event.target.value)
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
    
    // Convert values to numbers
    let num1 = parseFloat(firstItem);
    let num2 = parseFloat(secondItem);

    if (displayFirstItem.textContent.includes("(-" + firstItem + ")") 
        && 
        !displaySecondItem.textContent.includes("(-" + secondItem + ")")) {
        num1 = (-num1);
    } else if (displaySecondItem.textContent.includes("(-" + secondItem + ")") 
        && 
        !displayFirstItem.textContent.includes("(-" + firstItem + ")")) {
        num2 = (-num2);
    } else if (displayFirstItem.textContent.includes("(-" + firstItem + ")") 
        && 
        displaySecondItem.textContent.includes("(-" + secondItem + ")")) {
        num1 = (-num1);       
        num2 = (-num2);
    }

    if (displayFirstItem.textContent.includes("%") 
        && 
        !displaySecondItem.textContent.includes("%")) {
            let percentage = 1/100;
            num1 *= percentage;
    } else if (displaySecondItem.textContent.includes("%") 
        && 
        !displayFirstItem.textContent.includes("%")) {
            let percentage = 1/100;
            num2 *= percentage;
    } else if (displayFirstItem.textContent.includes("%") 
        && 
        displaySecondItem.textContent.includes("%")) {
            let percentage = 1/100;
            num1 *= percentage;
            num2 *= percentage;
    }

    // Call the operate function
    let result;
    if (firstItem.includes(".") || secondItem.includes(".")) {
        result = operate(num1, num2, currentOperator).toFixed(2);
    } else if((firstItem.includes(".") || secondItem.includes(".")) || beDivide) {
        result = operate(num1, num2, currentOperator).toFixed(2)
    } else {
        result = operate(num1, num2, currentOperator)
    }

    // Display result
    displayFirstItem.textContent = result;
    displayOperator.textContent = "";
    displaySecondItem.textContent = "";


    // Reset variables
    firstItem = result.toString();  // The result becomes the first number for future operations
    secondItem = "";
    currentOperator = null;
    isSecondItem = false;
    beAdd = false;
    beMultiply = false;
    beDivide = false;
    beMinus = false;
    isFirstItemSignChanged = false;
    isSecondItemSignChanged = false;
}

function basculateToSecondItem() {

    for(let i = 0; i < calculatorButtons.operators.length; i++) {
        let iteration = calculatorButtons.operators[i];
        switch (iteration.value) {
            case "+" :
                iteration.addEventListener("click", (event) => {
                    currentOperator = addOperation();
                    displayOperatorsOnScreen(event.target.value)
                });
                break;
            case "-" :
                iteration.addEventListener("click", (event) => {
                    currentOperator = minusOperation();
                    displayOperatorsOnScreen(event.target.value)
                });
                break;
            case "*":
                iteration.addEventListener("click", (event) => {
                    currentOperator = multiplyOperation();
                    displayOperatorsOnScreen(event.target.value)
                });
                break;
            case "/" :
                iteration.addEventListener("click", (event) => {
                    currentOperator = divideOperation();
                    displayOperatorsOnScreen(event.target.value)
                });
                break;
            case "" :
                iteration.addEventListener("click", () => calculate());
                break;
            default:
                return;
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
        //check the first item in 1st
        if (firstItem.includes(".") 
            || 
            displayFirstItem.textContent.includes("(-" + firstItem + ")")) {
                return
        } else {
            addCommaToFirstItem(".")
        }
    } else {
            //pass to second item verification in second place
        if (secondItem.includes(".") 
            || 
            displaySecondItem.textContent.includes("(-" + secondItem + ")")) {
                return 
        } else {
            addCommaToSecondItem(".")
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
        isFirstItemSignChanged = false;
        isSecondItemSignChanged = false

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

    if((beAdd || beMinus || beDivide || beMultiply) && secondItem) {
        // secondItem = secondItem.replace(secondItem[secondItemLength - 1], "");
        secondItem = secondItem.slice(0, -1);
        displaySecondItem.textContent = secondItem;
    } else if((beAdd || beMinus || beMultiply || beDivide) && secondItem === "") {
        console.log("operator erased");
        beAdd = false;
        beMultiply = false;
        beDivide = false;
        beMinus = false;
        isSecondItem = false;
        displayOperatorsOnScreen(" ");
    } else if (firstItem && (!beAdd || !beMinus || !beMultiply || !beDivide) 
                && 
                secondItem === "") {
                    firstItem = firstItem.slice(0, -1);
                    displayFirstItem.textContent = firstItem;
                    console.log("firstItem erased");
                    isFirstItemSignChanged = false
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
        //check firstItem first
        if (displayFirstItem.textContent.includes("%")) {
            return
        } else {
        addPercentageToFirstItem("%");
        }
    } else {
        //then check secondItem
        if (displaySecondItem.textContent.includes("%")) {
            return
        } else {
        addPercentageToSecondItem("%");
        }
    }
}

calculatorButtons.aczpercentage[1].addEventListener("click", restrictionToPercentages);

function changingSignOfFirstItem() {
    isFirstItemSignChanged ?
    displayFirstItem.textContent = "(-" + firstItem + ")" 
    : 
    displayFirstItem.textContent = firstItem;
}
function changingSignOfSecondItem() {
    
    isSecondItemSignChanged ? 
    displaySecondItem.textContent = "(-" + secondItem + ")" 
    : 
    displaySecondItem.textContent = secondItem;
}
function restrictionToChangeSign() {


    if (!isSecondItem) {
        //check firstItem first
        if (!firstItem) {
            return
        } else if (firstItem && isFirstItemSignChanged === false){
            isFirstItemSignChanged = true;
            changingSignOfFirstItem();
        } else if (firstItem && isFirstItemSignChanged === true) {
            isFirstItemSignChanged = false;
            changingSignOfFirstItem();
        }
    } else {
        //then check secondItem 
        if (!secondItem) {
            return
        } else if (secondItem && isSecondItemSignChanged === false){
            isSecondItemSignChanged = true;
            changingSignOfSecondItem();
        } else if (secondItem && isSecondItemSignChanged === true) {
            isSecondItemSignChanged = false;
            changingSignOfSecondItem();
        }
    }
}


calculatorButtons.aczpercentage[0].addEventListener("click", restrictionToChangeSign);




function addOperation() {

    if (firstItem === "") {
        isSecondItem = false;
        beAdd  = false;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
    } else {
        beAdd  = true;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
        isSecondItem = true;
    }; // Ensure that the first number is entered

};

function minusOperation() {
    if (firstItem === "") {
        isSecondItem = false;
        beMinus = false;
        beAdd = false;
        beMultiply = false;
        beDivide = false;
        firstItem = firstItem.concat(minusSign, firstItem);
        displayFirstItem.textContent = firstItem;
        //just stick a minus in front of firstItem no need to set another display
    } else {
        beMinus = true;
        beAdd = false;
        beMultiply = false;
        beDivide = false;
        isSecondItem = true;
    }; // Ensure that the first number is entered


}

function multiplyOperation() {
    if (firstItem === "") {
        isSecondItem = false;
        beAdd  = false;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
    } else {
        beMultiply = true;
        beAdd = false;
        beMinus = false;
        beDivide = false;
        isSecondItem = true;
    }; // Ensure that the first number is entered

}

function divideOperation() {

    if (firstItem === "") {
        isSecondItem = false;
        beAdd  = false;
        beMinus = false;
        beDivide = false;
        beMultiply = false;
    } else {
        beDivide = true;
        beMultiply = false;
        beAdd = false;
        beMinus = false;
        isSecondItem = true;
    }; // Ensure that the first number is entered



}

//the function that performs the operations 
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


//KEYBOARD SUPPORT

window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case "0":
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "1" :
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "2":
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
           } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "3":
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "4":
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "5":
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "6":
            // Do something for "down arrow" key press.
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "7":
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "8":
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "9":
            if (!isSecondItem) {
                firstItem += event.key;
                displayFirstItem.textContent = firstItem;
            } else {
                secondItem += event.key;
                displaySecondItem.textContent = secondItem;
            }
            break;
        case "Backspace":
            console.log(`%c🎨 ⍨ backspace`, "Your_CSS_Goes_Here")
            clearOnce();
            break;
        case "Enter":
// console.log(`%c🎨 ⍨ enter`, "Your_CSS_Goes_Here");
            calculate();
            break;
        case ".":
            restrictionToCommas();
            break;
        case "%":
            restrictionToPercentages();
            break;
        case "+":
            currentOperator = addOperation();
            displayOperatorsOnScreen(event.key);
            break;
        case "-":
            currentOperator = minusOperation();
            displayOperatorsOnScreen(event.key);
            break;
        case "/":
            currentOperator = divideOperation();
            displayOperatorsOnScreen(event.key);
            break;
        case "*":
            currentOperator = multiplyOperation();
            displayOperatorsOnScreen(event.key);
            break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
  
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true,
  );