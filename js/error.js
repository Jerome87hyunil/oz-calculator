const resultElement = document.getElementById("result");

// 에러 메시지를 화면에 표시
export const showError = (message) => {
  resultElement.classList.remove("d-none", "alert-info");
  resultElement.classList.add("alert-danger");
  resultElement.textContent = `에러: ${message}`;
};

// 화면의 에러 메시지를 제거
export const removeError = () => {
  resultElement.classList.remove("alert-danger");
  resultElement.classList.add("d-none");
};
