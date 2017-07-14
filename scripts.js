const display = document.querySelector(".display");
var numberArr = [];
var masterArr = [];
const operators = ["+","-","*","/"];
var answer;
const numberButtons = document.querySelectorAll(".math-number");
const equalButton = document.querySelector(".math-equals")
const addButton = document.querySelector("#plus");
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

addButton.addEventListener("click",function(){
  //check either array isn't empty
  if (numberArr.length > 0 || masterArr.length>0){
      //store current number in master array,
      if (numberArr.length > 0){
        masterArr.push(parseInt(numberArr.join("")));
      }
      //add + to master array
      masterArr.push("+");
      display.textContent = masterArr.join("");
      numberArr = [];
  }
})

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
