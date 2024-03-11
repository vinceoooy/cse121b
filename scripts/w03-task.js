/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add (number1, number2){
    return number1 + number2;
}
function addNumbers() {
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);
    document.querySelector('#sum').value = add(addNumber1, addNumber2);
}
document.querySelector('#addNumbers').addEventListener('click', addNumbers);



/* Function Expression - Subtract Numbers */

const subtract = function (number1, number2){
    return number1 - number2;
}
function subtractNumbers() {
    let subtractNumbers1 = Number(document.querySelector('#subtract1').value);
    let subtractNumbers2 = Number(document.querySelector('#subtract2').value);
    document.querySelector('#difference').value = subtract(subtractNumbers1, subtractNumbers2);
}
document.querySelector('#subtractNumbers').addEventListener('click', subtractNumbers);



/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;

function multiplyNumbers() {
    let multiplyNumbers1 = Number(document.querySelector('#factor1').value);
    let multiplyNumbers2 = Number(document.querySelector('#factor2').value);
    document.querySelector('#product').value = multiply(multiplyNumbers1, multiplyNumbers2);
}
document.querySelector('#multiplyNumbers').addEventListener('click', multiplyNumbers);



/* Open Function Use - Divide Numbers */
// I chose function declaration/definition
function divide (number1, number2){
    return number1 / number2;
}
function divideNumbers() {
    let divideNumber1 = Number(document.querySelector('#dividend').value);
    let divideNumber2 = Number(document.querySelector('#divisor').value);
    document.querySelector('#quotient').value = divide(divideNumber1, divideNumber2);
}
document.querySelector('#divideNumbers').addEventListener('click', divideNumbers);





/* Decision Structure */
document.querySelector('#getTotal').addEventListener('click', () => {
    let subtotal = Number(document.querySelector('#subtotal').value);
    let isMember = document.querySelector('#member').checked;
  
    if (isMember) {
      subtotal *= 0.8; // Apply a 20% discount for members
    }
  
    let totalDue = subtotal.toFixed(2); // Format total with two decimals
    document.querySelector('#total').textContent = `$ ${totalDue}`;
});

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.querySelector('#array').textContent = numbersArray;

/* Output Odds Only Array */
document.querySelector('#odds').textContent = numbersArray
.filter(number => number % 2 === 1);

/* Output Evens Only Array */
document.querySelector('#evens').textContent = numbersArray
.filter(number => number % 2 === 0);

/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').textContent = numbersArray
.reduce((sum, number) => sum + number);

/* Output Multiplied by 2 Array */
document.querySelector('#multiplied').textContent = numbersArray
.map(number => number * 2);

/* Output Sum of Multiplied by 2 Array */
document.querySelector('#sumOfMultiplied').textContent = numbersArray
.map(number => number * 2)
.reduce((sum, number) => sum + number); 