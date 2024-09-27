let firstItem = 3;
let secondItem = 2;
let beAdd = false;
let beMinus = false;
let beMultiply = false;
let beDivide = false;



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


console.log(`%c🎨 ⍨ ${operate(firstItem, secondItem, divideOperation())}`, "font-size:30px; color:red")
console.log(`%c🎨 ⍨ ${firstItem} ⍨ firstItem`, "Your_CSS_Goes_Here");
