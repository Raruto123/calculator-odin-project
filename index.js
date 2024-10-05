/*
1)lorsque quelqu'un tape une suite de chiffres (premier nombre)
2)appuie sur l'opérateur 
3)après l'opérateur c'est la deuxième suite de chiffres (deuxième nombre)
4) appuyer sur la touche = fait jouer la fonction operate()
 */




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

// let displayValue = screenDisplay.textContent;



function displayOnScreen(value) {
    // displayValue += value;
    screenDisplay.textContent += value;
}

function iteration(button) {
    
    for(let i = 0; i < button.length; i++ ){
        button[i].addEventListener("click", (event) => {
            // displayOnScreen(event.target.value)
            parseInt(event.target.value)
        });
    }
}

iteration(calculatorButtons.numbers);
iteration(calculatorButtons.operators);
iteration(calculatorButtons.comma);
iteration(calculatorButtons.aczpercentage);


let firstItem = iteration(calculatorButtons.numbers);
console.log(firstItem)
let secondItem = iteration(calculatorButtons.numbers);

function addOperation() {
    beAdd  = true;
    beMinus = false;
    beDivide = false;
    beMultiply = false;

};

function minusOperation() {
    beMinus = true;
    beAdd = false;
    beMultiply = false;
    beDivide = false;

}

function multiplyOperation() {
    beMultiply = true;
    beAdd = false;
    beMinus = false;
    beDivide = false;
}

function divideOperation() {
    beDivide = true;
    beMultiply = false;
    beAdd = false;
    beMinus = false;

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

console.log(`%c🎨 ⍨ operate`, "color:violet; font-weight:bold", 
    operate(firstItem, secondItem, addOperation()));



//À creuser

// let objects = {
//     a:123,
//     b:124
// }
// console.log(`%c🎨 ⍨ ${operate}`, "font-size:30px; color:red")
// console.log(`%c🎨 ⍨ operate`, "color:violet; font-weight:bold", operate);
// console.log(`%c🎨 ⍨ ${firstItem} ⍨ firstItem`, "Your_CSS_Goes_Here");
// console.log(`%c🎨 ⍨ ${objects} ⍨ firstItem`, "Your_CSS_Goes_Here");
// console.log(`this is objects : ${JSON.stringify(objects)}`);
// console.log(`%cthis is objects %o bvfhjfl`, "color:red;font-size:30px",beDivide)
// console.log(objects)
