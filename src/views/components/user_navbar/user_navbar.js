export default function renderUserNavbar() {
  const component = document.createElement("div");
  component.classList = ["navbar-end", "breadcrumb", "my-auto"];
  if (sessionStorage.getItem("token")) {
    component.innerHTML = `
        <ul id="navbar">
        <li><a href="/account">계정&상품 관리</a></li>
        <li><a id="logOut" href="#">로그아웃</a></li>
        <li>
            <a href="/cart" aria-current="page">
              <span class="icon">
                <i class="fas fa-cart-shopping"></i>
              </span>
            <span>카트</span>
          </a>
        </li>
        </ul>
        `;
  } else {
    component.innerHTML = `
        <ul id="navbar">
        <li id="loginCheck"><a href="/login">로그인</a></li>
        
        <li><a href="/register">회원가입</a></li>

      </ul>`;
  }

  const logoutBtnActive = () => {
    if (sessionStorage.getItem("token")) {
      // 로그인 했을때 생기는 로그아웃 기능 추가하는 버튼
      const logOut = component.querySelector("#logOut");

      logOut.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("nowLoginId");
        window.location.href = "/";
      });
    }
  };
  logoutBtnActive();
  return component;
}
