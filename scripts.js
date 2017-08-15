const display = document.querySelector(".display");
var numberArr = [];
var masterArr = [];
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

function addNumber(){
  if (masterArr.length === 1){
    masterArr = [];
    numberArr.push(parseInt(this.textContent));
    display.textContent = numberArr.join("");
  }
  //Store the value of each number in an array.
  else{
    numberArr.push(parseInt(this.textContent));
    display.textContent = Array(masterArr+ numberArr).join("").replace(/,/g,"");
  }
}

for (var i=0;i<operatorButtons.length; i++){
  operatorButtons[i].addEventListener("click",function(){
    //check either array isn't empty
    if (numberArr.length > 0){
        //store current number in master array,
        masterArr.push(parseInt(numberArr.join("")));
        //add + to master array
        masterArr.push(this.textContent);
        display.textContent = masterArr.join("");
        numberArr = [];
    }
    else if (masterArr.length >0 && operators.indexOf(masterArr[masterArr.length-1]) == -1){
      masterArr.push(this.textContent);
      display.textContent = masterArr.join("");
    }
  })
}

equalButton.addEventListener("click",function(){
  if (numberArr.length > 0){
    masterArr.push(parseInt(numberArr.join("")));
    answer = eval(masterArr.join(""));
    display.textContent = answer;
    numberArr = [];
    masterArr = [];
    masterArr[0] = answer;
  }
})

clearButton.addEventListener("click",function(){
  masterArr = [];
  numberArr = [];
  display.textContent = "0";
})
