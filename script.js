const numbersContainer = document.querySelector(".numbers-container");
let resultElement = document.querySelector(".result");
let detailsElement = document.querySelector(".details");


details = '';
let previousNum = "";
let nums = [];
let sign = "";
let lastOperation;


numbersContainer.addEventListener("click", function (e) {
  if (e.target.textContent !== "+" && e.target.textContent !== "=" && e.target.textContent !== '−' && e.target.textContent !== '×' && e.target.textContent !== '÷') {
    
      
    previousNum += e.target.textContent;

    resultElement.textContent = previousNum;
  }
  if (e.target.textContent === "+" ||e.target.textContent === '−' ||  e.target.textContent === '×' || e.target.textContent === '÷') {
    sign = e.target.textContent;
    
 
    if (lastOperation) { 
      nums = [];
      nums[0] = lastOperation;
      detailsElement.textContent = lastOperation + ' ' + sign + ' ' ;
      

    }
    if (!lastOperation ) {
      nums.push(previousNum);
      detailsElement.textContent +=  previousNum + ' ' + sign + ' ';

    }

    previousNum = "";

  }

  if (e.target.textContent === "=") {
    nums.push(previousNum);

    lastOperation = calculate(sign);
    detailsElement.textContent += previousNum + ' =';

    
  }
});

function calculate(sign) {
  const [firstNum, secondNum] = nums;

  let result = 0;
  if (sign === "+") {
    result = +firstNum + +secondNum;
    resultElement.textContent = result;

    return result;
  } else if (sign === "−") {
    result = +firstNum - +secondNum;
    resultElement.textContent = result;
    return result;
  } else if(sign  === '×') {
    result = +firstNum * +secondNum;
    resultElement.textContent = result;
    return result;
  } else if(sign === '÷') {
    result = +firstNum / +secondNum;
    resultElement.textContent = result;
    return result;
  }
}
