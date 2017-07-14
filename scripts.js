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
  numberButtons[i].addEventListener("click",function(){
    //if we just performed a calculation, and want to perform a separate one
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
  })
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
