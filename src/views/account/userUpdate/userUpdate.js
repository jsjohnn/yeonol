import * as Api from "/api.js";

// 토글 스위치를 누르면 해당하는 칸에 입력을 할수 있게 한다.
const fullNameToggle = document.querySelector("#fullNameToggle");
const passwordToggle = document.querySelector("#passwordToggle");

const phoneNumberToggle = document.querySelector("#phoneNumberToggle");
const telPhoneNumberToggle = document.querySelector("#telPhoneNumberToggle");

const nameInput = document.querySelector("#fullNameInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const phoneNumberInput = document.querySelector("#phoneNumberInput");
const telPhoneNumberInput = document.querySelector("#telPhoneNumberInput");
const currentPasswordInput = document.querySelector("#currentPasswordInput");

phoneNumberToggle.addEventListener("click", function () {
  changeDisabled(phoneNumberInput);
});
telPhoneNumberToggle.addEventListener("click", function () {
  changeDisabled(telPhoneNumberInput);
});
// changeDisabled(입력할수 있게 하고 싶은 태그)로 사용함.
// 사용하면 파라미터로 넣은 태그의 disabled속성이 true에서 false로 바뀌거나 반대로 된다.
function changeDisabled(tagElement) {
  tagElement.disabled = !tagElement.disabled;
}

//-----------------------------------------------------------------------------//
const submitButton = document.querySelector("#saveButton");
const nowLoginId = sessionStorage.getItem("nowLoginId");
submitButton.addEventListener("click", async function (e) {
  // TODO : DB에 저장하는 함수 사용해서 각 인풋 내용 DB로 전달 해서 업데이트 하는 내용.
  // 눌렀을때 현재 비밀번호를 입력하고 확인하는 모달 창을 뛰우는것은 시간날때
  e.preventDefault();
  if (passwordInput.value != passwordConfirmInput.value) {
    alert("업데이트할 비밀번호 확인을 재대로 해주세요.");
  } else {
    const res = await Api.get(`/api/useremail/${nowLoginId}`);
    
    const userId = res._id;
    const userRole = res.role;

    const data = {
      fullName: nameInput.value,
      password: passwordInput.value,
      // address: "",
      phoneNumber: phoneNumberInput.value,
      telNumber: telPhoneNumberInput.value,
      role: userRole,
      currentPassword: currentPasswordInput.value,
    };

    const response = await Api.patch(`/api/user`, userId, data);
    
    alert("정보 수정이 완료되었습니다.");
    window.location.href = "/";
  }
});
