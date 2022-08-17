export default function renderDropdown(list, initalValue, onChange) {
  const component = document.createElement("div");
  component.className = "dropdown";
  component.addEventListener("focusin", onFocus);
  component.addEventListener("focusout", unFocus);

  function onFocus(e) {
    component.classList.add("is-active");
  }
  function unFocus(e) {
    setTimeout(() => {
      component.classList.remove(["is-active"]);
    }, 300);
  }
  function onClickHandler(value) {
    // component.querySelector("#selected").innerText = value;
    // component.querySelectorAll(".dropdown-item").forEach((item) => {
    //   item.classList.remove(["is-active"]);
    // });
    // component.querySelector(`#${value}`).classList.add(["is-active"]);
    onChange(value);
  }

  component.innerHTML = `
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span id="selected">${initalValue}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
  <div class="dropdown-content">
  </div>
  </div>
`;

  ["전체", ...list].forEach((value) => {
    const item = document.createElement("a");
    item.className = "dropdown-item";
    item.id = `${value}`;
    item.innerHTML = `${value}`;
    item.onclick = () => onClickHandler(value);
    if (value === initalValue) {
      item.classList.add("is-active");
    }
    component.querySelector(".dropdown-content").appendChild(item);
  });

  return component;
}
