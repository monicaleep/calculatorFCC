//Todos:
// add decimal
// refactor code to object-oriented, all methods on a calculator
// use objects to store all operands

const display = document.querySelector(".display");
var buffer = [];
var stack = [];
const operators = ["+","-","*","/"];
const operatorButtons = document.querySelectorAll(".math-operator");
var answer;
const numberButtons = document.querySelectorAll(".math-number");
const equalButton = document.querySelector(".math-equals")
const clearButton = document.querySelector("#clear");

// Add event listeners to the numbers
for (let i =0; i<numberButtons.length; i++){
  numberButtons[i].addEventListener("click",addNumber)
}

//randomly add the buttons to calculator
(function (){
  //not DRY
  const all = document.querySelectorAll('.math');
  const newAll = shuffle(Array.from(all));
  const calc = document.querySelector('.calculator');
  for (let m =0; m<newAll.length; m++){
    calc.appendChild(newAll[m]);
  }
})();



//given an array, randomly shuffle its elements
//adapted from fisher-yates algorithm on wikipedia
function shuffle(arr){
  arr1 = arr;
  let n = arr.length
  for (let i =0; i<n-1; i++){
    let j = Math.floor(Math.random() * (n));
    let hold = arr[i];
    arr1[i] = arr1[j];
    arr[j] = hold;
    //console.log(arr1)
  }
  return arr;
}


//not DRY
function addNumber(){
  if (stack.length === 1){
    stack = [];
    buffer.push(parseInt(this.textContent));
    display.textContent = buffer.join("");
  }
  //Store the value of each number in an array.
  else{
    buffer.push(parseInt(this.textContent));
    display.textContent = Array(stack+ buffer).join("").replace(/,/g,"");
  }
}

//add operator button event listeners. could combine with number event listeners
for (var i=0;i<operatorButtons.length; i++){
  operatorButtons[i].addEventListener("click",function(){
    //check either array isn't empty
    if (buffer.length > 0){
        //store current number in master array,
        stack.push(parseInt(buffer.join("")));
        //add + to master array
        stack.push(this.textContent);
        display.textContent = stack.join("");
        buffer = [];
    }
    else if (stack.length >0 && operators.indexOf(stack[stack.length-1]) == -1){
      stack.push(this.textContent);
      display.textContent = stack.join("");
    }
  })
}


equalButton.addEventListener("click",function(){
  if (buffer.length > 0){
    stack.push(parseInt(buffer.join("")));
    answer = eval(stack.join(""));
    display.textContent = answer;
    buffer = [];
    stack = [];
    stack[0] = answer;
  }
})

clearButton.addEventListener("click",function(){
  stack = [];
  buffer = [];
  display.textContent = "0";
})
