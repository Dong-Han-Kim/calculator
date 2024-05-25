let numOne = '';
let operators = '';
let numTwo = '';
let onOperator = false;
let onDecimal = false;
let resultAfterNumber = false;
console.log(resultAfterNumber);
const buttons = document.querySelector('.buttons');
const result = document.querySelector('#result');

function calculate(num1, operator, num2) {
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);
	let output;

	switch (operator) {
		case '+':
			output = num1 + num2;
			break;
		case '-':
			output = num1 - num2;
			break;
		case '*':
			output = num1 * num2;
			break;
		case '/':
			output = num1 / num2;
			break;
		default:
			output = 0;
	}
	return output;
}

function onClickBtn(event) {
	const target = event.target;
	const action = target.classList[0];
	const btnContent = target.textContent;

	if (target.matches('button')) {
		if (action === 'number') {
			if (resultAfterNumber) {
				numOne = '';
				numTwo = '';
				operators = '';
				result.value = '';
				resultAfterNumber = false;
			}
			if (!operators) {
				numOne += btnContent;
				result.value += btnContent;
				onOperator = false;
				console.log(`one ${numOne}`);
			} else if (operators) {
				numTwo += btnContent;
				result.value += btnContent;
				console.log(`Two ${numTwo}`);
			}
		}

		if (action === 'operator') {
			if (resultAfterNumber) {
				numTwo = '';
				operators = '';
				result.value = numOne;
				resultAfterNumber = false;
			}

			if (btnContent === '-') {
				if (!numOne) {
					numOne += btnContent;
					result.value = numOne;
					console.log(`-one ${numOne}`);
				} else if (numOne && numOne !== '-' && numOne !== '' && !operators) {
					operators += btnContent;
					result.value += btnContent;
					onOperator = true;
					onDecimal = false;
					console.log(`-operators ${operators}`);
				} else if (operators && !numTwo) {
					numTwo += btnContent;
					result.value += numTwo;
					console.log(`-Two ${numTwo}`);
				}
			} else {
				if (!onOperator) {
					operators += btnContent;
					result.value += btnContent;
					console.log(`operators ${operators}`);
					onOperator = true;
				} else if (onOperator) {
					return;
				}
			}
			onDecimal = false;
		}

		if (action === 'decimal') {
			if (resultAfterNumber) {
				numOne = '';
				numTwo = '';
				operators = '';
				result.value = '';
				resultAfterNumber = false;
				return;
			}
			console.log(onDecimal);
			// 중복제거
			if (!onDecimal) {
				// 입력
				if (!operators) {
					numOne += btnContent;
					result.value += btnContent;
					console.log(onDecimal);
				} else {
					numTwo += btnContent;
					result.value += btnContent;
				}
			}
			onDecimal = true;
		}

		if (action === 'clear') {
			numOne = '';
			numTwo = '';
			operators = '';
			result.value = '';
			onDecimal = false;
			onOperator = false;
		}

		if (action === 'calculate') {
			const calculater = calculate(numOne, operators, numTwo);
			result.value = calculater;
			console.log(calculater);
			numOne = calculater.toString();
			numTwo = '';
			operators = '';
			onDecimal = false;
			onOperator = false;
			resultAfterNumber = true;
		}
	}
}

buttons.addEventListener('click', onClickBtn);
