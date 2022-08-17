import renderUserNavbar from "/components/user_navbar/user_navbar.js";

//랜더 html
const inner = document.querySelector("#container #inner");
inner.insertAdjacentHTML(
  "beforeend",
  `<div class="order-complete-container">
  <div class="box order-complete">
    <div class="icon-text">
      <span class="icon has-text-success">
        <i class="fas fa-check-square" aria-hidden="true"></i>
      </span>
      <span>예약이 완료되었습니다</span>
    </div>
    <div class="buttons-container">
      <button
        id="ordersButtton"
        class="button is-info is-light is-medium is-fullwidth"
      >
        주문내역보기
      </button>
      <button
        id="homeButton"
        class="button is-primary is-medium is-fullwidth"
      >
        홈으로 가기
      </button>
    </div>
  </div>
</div>`
);

const ordersButtton = document.querySelector("#ordersButtton");
const homeButton = document.querySelector("#homeButton");

// 주문 내역 버튼
function ordersFnc() {
  window.location.href = `/account/orders`;
}

// 홈으로 가는 버튼
function homeFnc() {
  window.location.href = `/`;
}

ordersButtton.addEventListener("click", ordersFnc);
homeButton.addEventListener("click", homeFnc);

//네비게이션
const userNavbarDiv = document.querySelector(".navbar-end");
userNavbarDiv.insertAdjacentElement("beforeend", renderUserNavbar());