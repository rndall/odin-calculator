const display = document.querySelector("#display");
const prevDisplay = document.querySelector("#previous");
const currDisplay = document.querySelector("#current");
const buttons = document.querySelectorAll("button");
const period = document.querySelector("#period");

let operator = null;
let firstVal = null;
let secondVal = null;
const defaultVal = "0";
currDisplay.textContent = defaultVal;
let isPrevOperator = false;
let isPrevEquals = false;

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
	isPrevOperator = false;
	period.disabled = false;
	isPrevEquals = false;
};

const setNumberValues = () => {
	const parts = prevDisplay.innerHTML.split(
		`<span style="margin-inline: 4px">${operator}</span>`,
	);
	[firstVal, secondVal] = [parts[0], parts[1].split("<")[0]];
};

const displayResult = () => {
	if (prevDisplay.textContent) {
		prevDisplay.innerHTML += `${currDisplay.textContent}<span style='margin-inline: 4px'>=</span>`;
		setNumberValues();

		if (firstVal && operator && secondVal) {
			if (operator === "÷" && +secondVal === 0) {
				currDisplay.textContent = "nuh uh";
			} else {
				currDisplay.textContent = +operate(
					operator,
					+firstVal,
					+secondVal,
				).toFixed(6);
			}
			operator = firstVal = secondVal = null;

			isPrevOperator = false;
			period.disabled = false;
		}
	}
};

const checkForPeriod = () => currDisplay.textContent.includes(".");

const populateDisplay = (button) => {
	const digit = button.textContent;
	const isOperator = button.classList.contains("operator");

	if (digit === ".") {
		if (isPrevEquals || currDisplay.textContent === "nuh uh") {
			defaultPrevDisplay();
			currDisplay.textContent = "0.";
		} else if (
			prevDisplay.innerHTML.split("<")[0] === currDisplay.textContent
		) {
			currDisplay.textContent = "0.";
		} else {
			currDisplay.textContent += digit;
		}
		isPrevEquals = false;
		button.disabled = true;
	} else if (isPrevEquals && !isOperator && button.disabled) {
		allClear();
		isPrevEquals = false;
		if (digit !== "AC") {
			currDisplay.textContent = digit;
		}
	} else if (digit === "=") {
		if (operator) {
			displayResult();
			isPrevEquals = true;
		}
	} else if (digit === "AC") {
		allClear();
	} else if (isCurrDisplayClear() && !isOperator && !isPrevOperator) {
		currDisplay.textContent = digit;
	} else if (isOperator) {
		if (operator && !isPrevOperator) {
			displayResult();
		}
		// if (currDisplay.textContent !== "nuh uh") {
		// 	operator = digit;
		// 	prevDisplay.innerHTML = `${currDisplay.textContent}<span style='margin-inline: 4px'>${digit}</span>`;
		// }
		if (!isPrevOperator) {
			isPrevOperator = true;
		}
		isPrevEquals = false;
		period.disabled = false;

		if (currDisplay.textContent !== "nuh uh") {
			operator = digit;
			prevDisplay.innerHTML = `${currDisplay.textContent}<span style='margin-inline: 4px'>${digit}</span>`;
		}
	} else if (isPrevOperator) {
		if (currDisplay.textContent === "nuh uh") {
			defaultPrevDisplay();
			currDisplay.textContent = digit;
		} else if (
			prevDisplay.innerHTML.split("<")[0] === currDisplay.textContent
		) {
			currDisplay.textContent = digit;
		} else {
			currDisplay.textContent += digit;
		}
		isPrevOperator = !isPrevOperator;
	} else {
		if (isPrevEquals) {
			allClear();
			currDisplay.textContent = "";
		} else if (!checkForPeriod()) {
			period.disabled = false;
		}
		currDisplay.textContent += digit;
	}
};

for (const button of buttons) {
	button.addEventListener("click", () => {
		populateDisplay(button);
	});
}
