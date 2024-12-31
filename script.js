const prevDisplay = document.querySelector("#previous");
const currDisplay = document.querySelector("#current");
const buttons = document.querySelectorAll("button");

let operator;
let firstVal;
let secondVal;
const defaultVal = "0";
currDisplay.textContent = defaultVal;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
	switch (operator) {
		case "+":
			return add(a, b);

		case "-":
			return subtract(a, b);

		case "×":
			return multiply(a, b);

		case "÷": {
			return divide(a, b);
		}
	}
};

const isCurrDisplayClear = () => currDisplay.textContent === defaultVal;

const populateDisplay = (button) => {
	const digit = button.textContent;
	const isOperator = button.classList.contains("operator");

	if (isCurrDisplayClear() && !isOperator) {
		currDisplay.textContent = digit;
	} else {
		currDisplay.textContent += digit;
	}
};

for (const button of buttons) {
	button.addEventListener("click", () => {
		populateDisplay(button);
	});
}
