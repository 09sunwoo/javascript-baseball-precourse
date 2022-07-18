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

  checkAnswer = ({ computerInputNumbers, userInputNumbers }) => {
    return computerInputNumbers.every(
      (num, index) => num === userInputNumbers[index]
    );
  };

  NumOfStrike = ({ computerInputNumbers, userInputNumbers }) => {
    let numOfStrike = 0;

    computerInputNumbers.forEach((num, index) => {
      if (num === userInputNumbers[index]) {
        numOfStrike++;
      }
    });
    return numOfStrike;
  };

  NumOfBall = ({ computerInputNumbers, userInputNumbers }) => {
    let numOfBall = 0;

    userInputNumbers.forEach((userNum, index) => {
      const numIndexInComputerInputNumbers = computerInputNumbers.findIndex(
        (computerNum) => computerNum === userNum
      );

      if (
        numIndexInComputerInputNumbers !== -1 &&
        index !== numIndexInComputerInputNumbers
      ) {
        numOfBall++;
      }
    });

    return numOfBall;
  };

  play(computerInputNumbers, userInputNumbers) {
    const numBall = this.NumOfBall({ computerInputNumbers, userInputNumbers });
    const numStrike = this.NumOfStrike({
      computerInputNumbers,
      userInputNumbers,
    });

    if (this.isCorrectAnswer({ computerInputNumbers, userInputNumbers })) {
      return ' 정답입니다';
    }

    if (numBall === 0 && numStrike === 0) {
      return '낫싱';
    }
    return `${numBall > 0 ? `${numBall}볼 ` : ''}${
      numStrike > 0 ? `${numStrike}스트라이크` : ''
    }`;
  }
}
