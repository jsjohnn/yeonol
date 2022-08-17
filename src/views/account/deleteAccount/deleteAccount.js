import * as Api from "/api.js";

const submitButton = document.querySelector("#submitButton");
const passwordInput = document.querySelector("#passwordInput");
const nowLoginId = sessionStorage.getItem("nowLoginId");



// 로그인 해서만 접근하다고 했을때 임, 로그인 안하고 url로접근시 따로 그 부분 처리하는거 해줘야함.

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();
 
  const response = await Api.get(`/api/useremail/${nowLoginId}`);
  const userId = response._id;
  
  const password = response.password;
  
  
  const data = {
    passwordConfirmInput: passwordInput.value,
    userId: userId,
    password: password,
  };
  const bodyData = JSON.stringify(data);
  // 비밀번호가 맞다면 회원 탈퇴를 진행한다.

  const res = await fetch(`/api/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: bodyData,
  });
  const result = await res.json();
  if (result.result == "error") {
    alert("값이 올바르지 않습니다.");
  } else {
    alert("정상적으로 탈퇴가 되었습니다.");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("nowLoginId");
    window.location.href = "/";
  }
});
