// 전역 변수 선언 (let, var, const 요구사항 충족)
let history = []; // 계산 기록을 저장하는 배열
let currentInput = ""; // 현재 입력값
let firstNumber = null; // 첫 번째 숫자
let operator = null; // 선택된 연산자
const VALID_OPERATORS = ["+", "-", "*", "/"]; // 유효한 연산자 목록 (const 사용)

const appendNumber = (number) => {
  try {
    // 1. number가 유효한 숫자인지 확인 (정규표현식 사용)
    if (!/^[0-9]$/.test(number)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    // 디스플레이에 '0'만 있을 경우, 입력된 숫자로 대체
    if (currentInput === "0") {
      currentInput = number;
    } else {
      currentInput += number;
    }

    // 디스플레이 업데이트
    document.getElementById("display").textContent = currentInput;
  } catch (error) {
    showError(error.message);
  }
};

const setOperator = (op) => {
  try {
    // 2. op가 유효한 연산자인지 확인 (배열 includes 메소드 사용)
    if (!VALID_OPERATORS.includes(op)) {
      throw new Error("유효한 연산자를 선택하세요.");
    }

    // 현재 입력값이 없으면 예외 처리 (연속 계산을 위해 firstNumber가 있는 경우는 예외)
    if (!currentInput && firstNumber === null) {
      throw new Error("숫자를 먼저 입력하세요.");
    }

    // 입력값이 존재할 때만 firstNumber를 업데이트
    if (currentInput) {
      firstNumber = Number(currentInput);
      // 3. firstNumber가 유효한 숫자인지 확인 (isNaN 사용)
      if (isNaN(firstNumber)) {
        throw new Error("유효한 숫자를 입력하세요.");
      }
    }

    operator = op;
    currentInput = ""; // 다음 숫자 입력을 위해 현재 입력값 초기화
  } catch (error) {
    showError(error.message);
  }
};

// 초기화 버튼(C) 클릭 시 모든 값 초기화
const clearDisplay = () => {
  currentInput = "";
  firstNumber = null;
  operator = null;
  history = []; // 기록 배열도 초기화
  document.getElementById("display").textContent = "0";
  document.getElementById("result").classList.add("d-none");

  // 도전 과제: 화면의 기록 표시도 초기화
  const historyList = document.getElementById("history-list");
  if (historyList) {
    historyList.innerHTML = "";
  }
};

// 계산 실행 (=)
const calculate = () => {
  const resultElement = document.getElementById("result");
  try {
    // 4. 계산에 필요한 값(firstNumber, operator, currentInput)이 모두 존재하는지 확인
    if (firstNumber === null || operator === null || currentInput === "") {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }

    const secondNumber = Number(currentInput);

    // 5. secondNumber가 유효한 숫자인지 확인
    if (isNaN(secondNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    // 6. 나눗셈에서 0으로 나누는지 확인
    if (operator === "/" && secondNumber === 0) {
      throw new Error("0으로 나눌 수 없습니다.");
    }

    var result; // var 키워드 사용 요구사항 충족

    // 7. operator에 따라 사칙연산 수행 (switch 문 사용)
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      default:
        // 혹시 모를 예외 상황 방지
        throw new Error("알 수 없는 연산자입니다.");
    }

    // 결과 출력
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;
    document.getElementById("display").textContent = result;

    // 계산 기록을 객체로 저장
    const record = { firstNumber, operator, secondNumber, result };
    history.push(record);
    console.log("계산 기록:", JSON.stringify(history, null, 2));

    // 도전 과제: 계산 기록 화면에 표시하는 함수 호출
    updateHistoryDisplay();

    // 연속 계산을 위한 상태 업데이트
    firstNumber = result; // 계산 결과를 다음 계산의 첫 번째 숫자로 설정
    currentInput = ""; // 다음 입력을 위해 초기화
    operator = null;
  } catch (error) {
    showError(error.message);
  }
};

// 에러 메시지 출력
const showError = (message) => {
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

// 도전 과제: 계산 기록 표시 기능 // history 배열의 내용을 화면에 표시
const updateHistoryDisplay = () => {
  // index.html에 추가된 history-list 요소를 가져옴
  const historyList = document.getElementById("history-list");
  if (!historyList) return;

  historyList.innerHTML = ""; // 기존 목록을 비움

  // for 루프를 사용하여 history 배열을 순회 (요구사항)
  for (let i = 0; i < history.length; i++) {
    const record = history[i];
    const listItem = document.createElement("li");
    // Bootstrap 클래스를 추가하여 디자인 개선
    listItem.classList.add("list-group-item");
    listItem.textContent = `${record.firstNumber} ${record.operator} ${record.secondNumber} = ${record.result}`;
    // 목록의 맨 위에 새로운 기록이 추가되도록 prepend 사용
    historyList.prepend(listItem);
  }
};
