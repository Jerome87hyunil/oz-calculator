// 계산 기록을 배열에 저장하고 콘솔에 출력
export default function saveHistory(
  firstNumber,
  operator,
  secondNumber,
  result,
  history
) {
  const record = { firstNumber, operator, secondNumber, result };
  const newHistory = [...history, record]; // 불변성을 지키기 위해 새 배열 생성
  console.log("계산 기록:", JSON.stringify(newHistory, null, 2));
  return newHistory;
}
