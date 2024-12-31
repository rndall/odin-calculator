const prevDisplay = document.querySelector("#previous");
const currDisplay = document.querySelector("#current");

let operator;
let firstVal;
let secondVal;
const defaultVal = 0;
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
