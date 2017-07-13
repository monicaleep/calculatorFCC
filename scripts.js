const display = document.querySelector(".display");
var arr = [];
const numberButtons = document.querySelectorAll(".math-number");
const equalButton = document.querySelector(".math-equals")
for (let i =0; i<numberButtons.length; i++){
  numberButtons[i].addEventListener("click",function(){
    arr.push(parseInt(this.textContent));
    display.textContent = parseInt(arr.join(""));
  })
}
equalButton.addEventListener("click",function(){
  display.textContent = parseInt(arr.join(""));
})
