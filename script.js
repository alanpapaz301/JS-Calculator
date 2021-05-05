const display = document.querySelector(".display");

const data = {
  nums1: [],
  nums2: [],
  displayValue: "",
  operator1: null,
  operator2: null,
};

function updateDisplay(value) {
  data.displayValue = value;
  display.innerHTML = data.displayValue;
}

const clicks = document.querySelector(`.btnContainer`);
clicks.addEventListener("click", (event) => {
  const { target } = event;
  //Identify if the clicked element is a button
  if (target.matches("button")) {
    if (target.matches(".btn-number")) {
      if (data.operator1 === null) {
        data.nums1.push(target.value);
        let numsString = data.nums1.join("");
        updateDisplay(numsString);
      } else {
        data.nums2.push(target.value);
        let numsString =
          data.nums1.join("") + data.operator1 + data.nums2.join("");
        updateDisplay(numsString);
      }
      //If an operator is clicked with no numbers before, nothing happens
      //If there is a number before, append the operator to the number on the display
    } else if (target.matches(".btn-operator")) {
      if (data.nums1.length === 0) return;
      else if (data.operator1 === null) {
        data.operator1 = target.value;
        updateDisplay(data.displayValue + data.operator1);
      }
      //If there are already 2 different numbers and an operator selected, selecting another operator
      //executes the first calculation and updates the display to the result appended to the second operator selected
      else if (data.nums2.length !== 0) {
        data.operator2 = target.value;

        let numResult = null;
        let displayResult = null;

        switch (data.operator1) {
          case "+":
            numResult =
              Number(data.nums1.join("")) + Number(data.nums2.join(""));
            displayResult =
              data.nums1.join("") +
              " + " +
              data.nums2.join("") +
              " = " +
              numResult.toString() +
              " " +
              data.operator2;
            break;
          case "-":
            numResult =
              Number(data.nums1.join("")) - Number(data.nums2.join(""));
            displayResult =
              data.nums1.join("") +
              " - " +
              data.nums2.join("") +
              " = " +
              numResult.toString() +
              " " +
              data.operator2;
            break;
          case "/":
            numResult =
              Number(data.nums1.join("")) / Number(data.nums2.join(""));
            displayResult =
              data.nums1.join("") +
              " / " +
              data.nums2.join("") +
              " = " +
              numResult.toString() +
              " " +
              data.operator2;
            break;
          case "*":
            numResult =
              Number(data.nums1.join("")) * Number(data.nums2.join(""));
            displayResult =
              data.nums1.join("") +
              " * " +
              data.nums2.join("") +
              " = " +
              numResult.toString() +
              " " +
              data.operator2;
            break;
        }

        updateDisplay(displayResult);
        data.nums1 = [numResult];
        data.nums2 = [];
        data.operator1 = data.operator2;
        data.operator2 = null;
      }
    }
    //Updates the display to show the result
    if (target.matches(".btn-equal")) {
      let numResult = null;
      let displayResult = null;

      switch (data.operator1) {
        case "+":
          numResult = Number(data.nums1.join("")) + Number(data.nums2.join(""));
          displayResult =
            data.nums1.join("") +
            " + " +
            data.nums2.join("") +
            " = " +
            numResult.toString();
          break;
        case "-":
          numResult = Number(data.nums1.join("")) - Number(data.nums2.join(""));
          displayResult =
            data.nums1.join("") +
            " - " +
            data.nums2.join("") +
            " = " +
            numResult.toString();
          break;
        case "/":
          numResult = Number(data.nums1.join("")) / Number(data.nums2.join(""));
          displayResult =
            data.nums1.join("") +
            " / " +
            data.nums2.join("") +
            " = " +
            numResult.toString();
          break;
        case "*":
          numResult = Number(data.nums1.join("")) * Number(data.nums2.join(""));
          displayResult =
            data.nums1.join("") +
            " * " +
            data.nums2.join("") +
            " = " +
            numResult.toString();
          break;
      }

      updateDisplay(displayResult);
      data.nums1 = [numResult];
      data.nums2 = [];
      data.operator1 = null;
      data.operator2 = null;
    }
    //Clears all variables and resets the display when clicking the cancel button
    if (target.matches(".btn-cancel")) {
      updateDisplay("0");
      data.nums1 = [];
      data.nums2 = [];
      data.operator1 = null;
      data.operator2 = null;
    }
  }
});
