//Todos:
// add decimal
// refactor code to object-oriented, all methods on a calculator


const display = document.querySelector(".display");
let buffer = [];
let stack = [];
const operators = ["+", "-", "*", "/"];
const operatorButtons = document.querySelectorAll(".math-operator");
const numberButtons = document.querySelectorAll(".math-number");
const equalButton = document.querySelector(".math-equals")
const clearButton = document.querySelector("#clear");
const decimal = document.querySelector("#decimal");

// Add event listeners
numberButtons.forEach(button =>button.addEventListener("click", handleNumber))
decimal.addEventListener('click', handleDecimal)
clearButton.addEventListener("click", handleClear)
operatorButtons.forEach(button => button.addEventListener("click", handleOperator))
equalButton.addEventListener("click", handleEquals)


function handleEquals(){
  if (buffer.length > 0) {
    stack.push(parseFloat(buffer.join("")));
    const answer = eval(stack.join(""));
    display.textContent = Math.round((answer * 1000000000)) / 1000000000;
    buffer = [];
    stack = [];
    stack[0] = Math.round((answer * 1000000000)) / 1000000000;
  }
}

function handleOperator(){
  //check buffer array isn't empty
  if (buffer.length > 0) {
    //store current number in stack ,
    stack.push(parseFloat(buffer.join("")));
    //add operator to stack
    stack.push(this.textContent);
    display.textContent = stack.join("");
    buffer = [];
  } else if (stack.length > 0 && operators.indexOf(stack[stack.length - 1]) == -1) {
    stack.push(this.textContent);
    display.textContent = stack.join("");
  }
}

function handleClear(){
  stack = [];
  buffer = [];
  display.textContent = "0";
}

function handleDecimal(){
  if (buffer.length === 0){
    buffer.push(0, ".");
    display.textContent = stack.concat(buffer).join("").replace(/,/g, "")
  }
  else if( buffer.indexOf(".") == -1){
    buffer.push(".")
    display.textContent = stack.concat(buffer).join("").replace(/,/g, "")
  }
}

function handleNumber() {
  buffer.push(parseInt(this.textContent));
  if (stack.length === 1) {
    stack = [];
    display.textContent = buffer.join("");
  }
  else {
    display.textContent = stack.concat(buffer).join("").replace(/,/g, "");
  }
}


//randomly add the buttons to calculator
// (function (){
//   //not DRY
//   const all = document.querySelectorAll('.math');
//   const newAll = shuffle(Array.from(all));
//   const calc = document.querySelector('.calculator');
//   for (let m =0; m<newAll.length; m++){
//     calc.appendChild(newAll[m]);
//   }
// })();
//given an array, randomly shuffle its elements
//adapted from fisher-yates algorithm on wikipedia
// function shuffle(arr){
//   arr1 = arr;
//   let n = arr.length
//   for (let i =0; i<n-1; i++){
//     let j = Math.floor(Math.random() * (n));
//     let hold = arr[i];
//     arr1[i] = arr1[j];
//     arr[j] = hold;
//   }
//   return arr;
// }
