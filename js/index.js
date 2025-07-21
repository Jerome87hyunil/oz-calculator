// 모듈 임포트
import calculateOperation from "./operations.js";
import * as input from "./input.js";
import * as error from "./error.js";
import saveHistory from "./history.js";

// 상태 변수 (애플리케이션의 모든 상태를 여기서 관리)
let state = {
  history: [],
  currentInput: "",
  firstNumber: null,
  operator: null,
};

// --- 상태를 변경하는 함수들 ---

// 숫자 입력 처리
export function handleAppendNumber(number) {
  error.removeError();
  state.currentInput = input.appendNumber(number, state.currentInput);
  input.setDisplay(state.currentInput);
}

// 연산자 입력 처리
export function handleSetOperator(op) {
  try {
    error.removeError();
    // 연산자 유효성 검사
    const validOperator = input.setOperator(
      op,
      state.currentInput,
      state.firstNumber
    );

    // 현재 입력값이 있을 때만 firstNumber를 업데이트
    if (state.currentInput) {
      state.firstNumber = Number(state.currentInput);
    }

    state.operator = validOperator;
    state.currentInput = ""; // 다음 입력을 위해 초기화
  } catch (e) {
    error.showError(e.message);
  }
}

// 초기화 처리
export function handleClear() {
  state.history = [];
  state.currentInput = "";
  state.firstNumber = null;
  state.operator = null;
  input.resetDisplay();
}

// Backspace 처리
export function handleSubDisplay() {
  if (state.currentInput) {
    state.currentInput = input.subDisplay(state.currentInput);
  }
}

// 최종 계산 로직 (default export)
export default function calculate() {
  try {
    error.removeError();

    // 계산에 필요한 값이 모두 있는지 확인
    if (
      state.firstNumber === null ||
      state.operator === null ||
      state.currentInput === ""
    ) {
      throw new Error("계산에 필요한 값이 부족합니다.");
    }
    const secondNumber = Number(state.currentInput);
    if (isNaN(secondNumber)) {
      throw new Error("유효한 숫자를 입력하세요.");
    }

    // 연산 모듈을 통해 결과 계산
    const result = calculateOperation(
      state.firstNumber,
      secondNumber,
      state.operator
    );

    // 결과 출력
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("d-none", "alert-danger");
    resultElement.classList.add("alert-info");
    resultElement.textContent = `결과: ${result}`;
    input.setDisplay(result.toString()); // 다음 계산을 위해 디스플레이에 결과 표시

    // 기록 저장
    state.history = saveHistory(
      state.firstNumber,
      state.operator,
      secondNumber,
      result,
      state.history
    );

    // 연속 계산을 위한 상태 업데이트
    state.firstNumber = result;
    state.currentInput = "";
    state.operator = null;
  } catch (e) {
    error.showError(e.message);
  }
}

// main.js에서 사용할 상수들을 다시 export
export const VALID_NUMBERS = input.VALID_NUMBERS;
export const VALID_OPERATORS = input.VALID_OPERATORS;
