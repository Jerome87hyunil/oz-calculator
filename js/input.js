// 유효성 검사를 위한 상수
export const VALID_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const VALID_OPERATORS = ["+", "-", "*", "/"];

// 디스플레이에 표시될 텍스트를 설정 (DOM 조작은 다른 곳에서)
export const setDisplay = (text) => {
  document.getElementById("display").textContent = text;
};

// 현재 입력값에 숫자를 추가하고 유효성을 검사
export const appendNumber = (number, currentInput) => {
  if (!VALID_NUMBERS.includes(number)) {
    throw new Error("유효한 숫자를 입력하세요.");
  }
  // 0으로 시작하는 것을 방지 (예: 05 -> 5)
  if (currentInput === "0") {
    return number;
  }
  return currentInput + number;
};

// 연산자를 설정하고 유효성을 검사
export const setOperator = (op, currentInput, firstNumber) => {
  if (!VALID_OPERATORS.includes(op)) {
    throw new Error("유효한 연산자를 선택하세요.");
  }
  if (!currentInput && firstNumber === null) {
    throw new Error("숫자를 먼저 입력하세요.");
  }
  return op;
};

// 디스플레이와 관련된 값을 초기화
export const resetDisplay = () => {
  setDisplay("0");
  document.getElementById("result").classList.add("d-none");
};

// 입력값의 마지막 한 글자를 삭제 (Backspace 기능)
export const subDisplay = (currentInput) => {
  const newDisplayValue = currentInput.slice(0, -1) || "0";
  setDisplay(newDisplayValue);
  return newDisplayValue;
};
