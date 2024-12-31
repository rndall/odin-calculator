const display = document.querySelector("#display");
const prevDisplay = document.querySelector("#previous");
const currDisplay = document.querySelector("#current");
const buttons = document.querySelectorAll("button");

let operator = null;
let firstVal = null;
let secondVal = null;
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

const defaultPrevDisplay = () => {
	prevDisplay.textContent = "";
};

const defaultCurrDisplay = () => {
	currDisplay.textContent = defaultVal;
};

const allClear = () => {
	defaultPrevDisplay();
	defaultCurrDisplay();
};

const setNumberValues = () => {
	const parts = prevDisplay.innerText.split(operator);
	[firstVal, secondVal] = [parts[0], parts[1].slice(0, -1)];
};

const populateDisplay = (button) => {
	const digit = button.textContent;
	const isOperator = button.classList.contains("operator");

	if (digit === "=") {
		if (prevDisplay.textContent) {
			prevDisplay.innerHTML += `${currDisplay.textContent}<span style='margin-inline: 4px'>${digit}</span>`;
			setNumberValues();

			if (firstVal && operator && secondVal) {
				if (operator === "÷" && secondVal === "0") {
					currDisplay.textContent = "nuh uh";
				} else {
					currDisplay.textContent = operate(operator, +firstVal, +secondVal);
					operator = firstVal = secondVal = null;
				}
			}
		}
	} else if (digit === "AC") {
		allClear();
	} else if (isCurrDisplayClear() && !isOperator) {
		currDisplay.textContent = digit;
	} else if (isOperator) {
		operator = digit;
		prevDisplay.innerHTML = `${currDisplay.textContent}<span style='margin-inline: 4px'>${digit}</span>`;
	} else if (prevDisplay.textContent.at(-1)) {
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
