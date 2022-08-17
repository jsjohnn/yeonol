const fullNameToggle = document.querySelector("#fullNameToggle");
const passwordToggle = document.querySelector("#passwordToggle");
const addressToggle = document.querySelector("#addressToggle");
const phoneNumberToggle = document.querySelector("#phoneNumberToggle");

const nameInput = document.querySelector("#fullNameInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const postalCodeInput = document.querySelector("#postalCodeInput");

fullNameToggle.addEventListener("click", function () {
  changeDisabled(nameInput);
});
passwordToggle.addEventListener("click", function () {
  changeDisabled(passwordInput);
  changeDisabled(passwordConfirmInput);
});
addressToggle.addEventListener("click", function () {
  changeDisabled(passwordConfirmInput);
});
phoneNumberToggle.addEventListener("click", function () {
  changeDisabled(postalCodeInput);
});

function changeDisabled(tagElement) {
  if (tagElement.disabled == true) {
    tagElement.disabled = false;
  } else if (tagElement.disabled == false) {
    tagElement.disabled = true;
  }
}
