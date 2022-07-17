const buttons = document.querySelectorAll('button');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let isFloatingPoint = false;
let operationDone = false;
let operationPressed = false;

setDisplayContent(0);

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.value == 'clear') {
      clearALl();
      return;
    } 
    
    if (operationDone) {
      clearALl(true);
    }

    if (operator == '') {
      firstNumber = takeInput(btn, firstNumber);
      setDisplayContent(firstNumber);
    } else {
      secondNumber = takeInput(btn, secondNumber);
      setDisplayContent(secondNumber);
    }
  });
});

function setDisplayContent(value) {
  const display = document.querySelector('.display');
  display.textContent = value;
}

function clearALl(save=false) {
  if (save) {
    firstNumber = secondNumber;
  } else {
    firstNumber = '';
    operator = '';
    operationPressed = false;
  }
  secondNumber = '';
  isFloatingPoint = false;
  operationDone = false;
  setDisplayContent('0');
}

function sum() {
  const result = parseFloat(firstNumber) + parseFloat(secondNumber);
  return result;
}

function substract() {
  const result = parseFloat(firstNumber) - parseFloat(secondNumber);
  return result;
}

function multiply() {
  const result = parseFloat(firstNumber) * parseFloat(secondNumber);
  return result;
}

function divide() {
  const result = parseFloat(firstNumber) / parseFloat(secondNumber);
  return Math.round(result * 100) / 100;
}

function takeInput(input, num) {
  output = '';
  if (num != '' && num.length >= 10) return num;
  switch (input.value) {
    case 'number':
      if (num == '0') return num;
      if (num != '') {
        output = num + input.dataset.num;
      } else {
        output = '' + input.dataset.num;
      }
      break;
    case 'sign':
      if (num != '' && num.charAt(0) != '-') {
        output = '-' + num;
      } else if (num != '') {
        output = num.substring(1);
      }
      break;
    case 'percent':
      if (num != '') {
        output = '' + (parseFloat(num) / 100);
      }
      break;
    case '.':
      if (num == '') {
        num = '0';
      }
      if (!isFloatingPoint) {
        isFloatingPoint = true;
        output = num + '.';
      } else {
        return num;
      }
      break;
    case 'operator':
      if (operationPressed) {
        output = operate()
        operator = input.dataset.opt;
      } else {
        operationPressed = true;
        operator = input.dataset.opt;
        output = num;
      }
      
      break;
    case 'operate':
      if (secondNumber == '') {
        output = firstNumber;
      } else {
        output = operate();
      }
      operationPressed = false;
  }
  return output;
}

function operate() {
  result = 0;
  operationDone = true;
  switch (operator) {
    case 'sum': 
      result = sum();
      break;
    case 'substract':
      result = substract();
      break;
    case 'multiply':
      result = multiply();
      break;
    case 'divide':
      result = divide();
      break;
  }
  return result;
}




