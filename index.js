let firstItem = 3;
let secondItem = 2;
let object = {
    secondItems : document.getElementsByTagName("div").item(1)
}
console.log(object.secondItems)
let beMinus = false;
let beAdd = false;



function addOperation(itemOne, itemTwo) {
    beAdd  = true;
    beMinus = false


    return itemOne+itemTwo
};

function minusOperation(itemOne, itemTwo) {
    beMinus = true;
    beAdd = false

    return itemOne - itemTwo
}

function operate(itemOne, itemTwo, operator) {

    let results;
    if (beMinus) {
        return results = itemOne - itemTwo
    } else if (beAdd) {
        return results = itemOne+itemTwo
    }

    return results
}

console.log(beAdd)
console.log(operate(firstItem, secondItem, addOperation(firstItem, secondItem)))