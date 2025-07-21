// index.js에서 필요한 모든 함수와 상태를 가져옴
import calculate, {
  handleAppendNumber,
  handleSetOperator,
  handleClear,
  handleSubDisplay,
  VALID_NUMBERS,
  VALID_OPERATORS,
} from "./index.js";

// HTML의 onclick 이벤트와 모듈 함수를 연결하기 위해 window 객체에 할당
// 모듈 스코프에 있는 함수를 전역 스코프에서 사용할 수 있음
window.handleAppendNumber = handleAppendNumber;
window.handleSetOperator = handleSetOperator;
window.handleClear = handleClear;
window.calculate = calculate;

// 키보드 입력 이벤트 처리
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (VALID_NUMBERS.includes(key)) {
    handleAppendNumber(key);
  } else if (VALID_OPERATORS.includes(key)) {
    // 키보드 * 나 / 입력 시 이벤트 전파 방지
    event.preventDefault();
    handleSetOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    handleSubDisplay();
  } else if (key.toLowerCase() === "c" || key === "Escape") {
    handleClear();
  }
});

console.log("계산기 모듈이 성공적으로 로드되었습니다. 🚀");
