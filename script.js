/********************************************************************************************************/
/*------------------- DOM Selection -----------------*/
// The Container That Contains All The Numbers & Signs
const numbersContainer = document.querySelector(".numbers-container");

let resultElement = document.querySelector(".result");
let detailsElement = document.querySelector(".details");

// Clear & Delete Buttons
const clearBtnElement = document.querySelector(".clear");
const deleteBtnElement = document.querySelector(".delete");
/********************************************************************************************************/
let previousNum = "";
let sign = "";
let numbers = [];
let lastOperation = null;

/********************************************************************************************************/
/*------------------- Helper Functions -----------------*/
function reset() {
  // Reset Variables
  numbers = [];
  lastOperation = null;
  previousNum = "";

  // Reset DOM Elements
  resultElement.textContent = "";
  detailsElement.innerHTML = "&nbsp;";
}

function deleteNum() {
  // Convert The String Previous Num To Array - Remove Last Number - Convert It Back To String - Store The Result In Previous Num
  previousNum = previousNum.split("").splice(0, previousNum.length - 1).join("");

  // Update The UI
  resultElement.textContent = previousNum;
}
/********************************************************************************************************/

numbersContainer.addEventListener("click", function (e) {
  // Check If The Element That Was Clicked Is A Button Or Not
  if(e.target.classList.contains("btn-number")) {
    // Extract The Number Or The Sign
    currNumOrSign = e.target.textContent;
    

    if(currNumOrSign !== "+" && currNumOrSign !== "=" && currNumOrSign !== "−" && currNumOrSign !== "×" && currNumOrSign !== "÷" ) {
    // If Number Was Clicked Then Change Previous Num To Be The Clicked Number & Update The UI
      previousNum += currNumOrSign;
      resultElement.textContent = previousNum;
    }

    if(currNumOrSign === "+" || currNumOrSign === "−" || currNumOrSign === "×" || currNumOrSign === "÷" ) {
      // Extract The Sign
      sign = currNumOrSign;

      // If Last Operation Has Value , Then Clear Numbers Array & Assign The Last Operation To Be The First Element In The Array
      if(lastOperation !== null) {
        numbers = [];
        numbers[0] = lastOperation;

        // Update The UI
        detailsElement.textContent = `${lastOperation} ${sign} `;
      }

      // If LastOperation Is Not Defined ( Not Operation Done Yet) Then Push Previous Num TO Numbers Array & Update The UI
      if (lastOperation === null) {
        numbers.push(previousNum);
        detailsElement.textContent += `${previousNum} ${sign} `
      }
 
      // Removing Previous As We Already Stored It Into The Array In Line 71 - To Prevent The New Num From Joining The Old Num
      previousNum = "";
    }

    if (currNumOrSign === "=") {
      // Update Numbers Array Again To Store The Previous Number Upon Clicking = 
      numbers.push(previousNum);
      lastOperation = calculate(sign);

      // Update The UI
      detailsElement.textContent += `${previousNum} =`
    }
  }
});

function calculate(sign) {
  const [firstNum, secondNum] = numbers;
  let result = 0;

  if (sign === "+") {
    result = +firstNum + +secondNum;
  } else if (sign === "−") {
    result = +firstNum - +secondNum; 
  } else if (sign === "×") {
    result = +firstNum * +secondNum;
  } else if (sign === "÷") {
    result = +firstNum / +secondNum;
    
  }

  resultElement.textContent = result;
  return result;
}
clearBtnElement.addEventListener("click", function () {
  reset();
});

deleteBtnElement.addEventListener("click", function () {
  deleteNum();
});



