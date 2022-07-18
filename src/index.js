export default class BaseballGame {
  constructor() {
    this.userInputNumbers = [];
    this.computerInputNumbers = this.makeAnswerNumbers();
  }

  makeAnswerNumbers = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = [];

    for (let i = 0; i < 3; i++) {
      const randomNumberIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomNumberIndex]);
      numbers.splice(randomNumberIndex, 1);
    }

    return result;
  };

  eventListener = () => {
    document
      .querySelector('#submit')
      .addEventListener('click', (event) =>
        this.checkUserInput(document.querySelector('#user-input').value)
      );
  };

  setUserInputNumbers = (inputNumber) => {
    this.userInputNumbers = inputNumber
      .split('')
      .map((numStr) => parseInt(numStr));
  };

  isNumber = (item) => {
    if (isNaN(item)) {
      return false;
    }
    return true;
  };

  isIncludeZero = () => {
    return this.userInputNumbers.includes(0);
  };

  isDuplicate = () => {
    const setNumbers = new Set(this.userInputNumbers);
    if (this.userInputNumbers.length !== setNumbers.size) {
      return true;
    }
    return false;
  };

  checkUserInput = (userInput) => {
    const alertMessage = '조건에 맞게 다시작성하세요';

    if (!this.isNumber(userInput)) {
      alert(alertMessage);
      return;
    }

    if (this.isIncludeZero(userInput)) {
      alert(alertMessage);
      return;
    }

    if (this.isDuplicate(userInput)) {
      alert(alertMessage);
      return;
    }
    if (userInput.length !== 3) {
      alert(alertMessage);
      return;
    }

    this.setUserInputNumbers(userInput);

    this.play(this.computerInputNumbers, this.userInputNumbers);
  };

  play(computerInputNumbers, userInputNumbers) {
    return '결과 값 String';
  }
}
