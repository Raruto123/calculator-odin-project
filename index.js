/*
1) l'appuie sur une touche affiche la valeur de la touche
2) 
 */



let firstItem = 3;
let secondItem = 2;
let beAdd = false;
let beMinus = false;
let beMultiply = false;
let beDivide = false;
let numbersButtons = {
    numbers : document.getElementsByClassName("numbers"),
}
let screenDisplay = document.getElementsByClassName("display")[0];

// console.log(`%c🎨 ⍨ numbersButtons`, "color:pink; font-weight:bold; font-size:30px", numbersButtons.one);

function iteration(button) {
    
    for(let i = 0; i < )
}

function displayOnScreen(value) {
    screenDisplay.textContent = value
}


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

    return results
}




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
