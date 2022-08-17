import * as Api from "/api.js";
import renderUserNavbar from "/components/user_navbar/user_navbar.js";

//유저 정보 불러오기
async function userTest() {
  const nowLoginIdEmail = sessionStorage.getItem("nowLoginId");
  //1234@naver.com

  const res = await Api.get("/api/useremail", nowLoginIdEmail);
  //GET 요청: /api/useremail/1234@naver.com
  return res;
}

//상품 정보 불러오기
async function productTest() {
  const urlPathname = window.location.pathname;
  const productId = urlPathname
    .split("/")
    .filter((element) => element !== "")[1];
  /* 상품 번호로 상품 정보 불러오기 */
  const res = await Api.get("/api/package", productId);
  return res;
}

//장바구니에서 필터링을 통해서 인원수 입력을 불러옴
function loadedPersons(productId) {
  const cartToken = JSON.parse(sessionStorage.getItem("cartToken"));
  const tokenInfo = cartToken.filter(
    (element) => element.objectId === productId
  )[0];

  let persons = "";
  if (productId === tokenInfo.objectId) {
    persons = tokenInfo.persons;
  }
  return persons;
}

async function renderHtml() {
  const inner = document.querySelector("#container #inner");
  //유저 정보 불러오기
  const { fullName, email, phoneNumber, telNumber } = await userTest();
  //상품 정보 불러오기
  const {
    packageName,
    days,
    totalNumber,
    countNumber,
    substance,
    price,
    _id,
    departureAt,
    arrivalAt,
    country,
  } = await productTest();
  const persons = loadedPersons(_id); //토큰을 통해 인원수 불러옴
  const fuelSurcharge = price * 0.1;

  inner.insertAdjacentHTML(
    "beforeend",
    `<!-- 예약정보 -->
    <section id="infoBox" class="box">
      <label id="infoLabel" class="label">예약정보</label>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">이름</label>
        </div>
        <div class="field-body">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="예약자 성함을 적어주세요."
              value ="${fullName ? `${fullName}` : ""}"
            />
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">이메일</label>
        </div>
        <div class="field-body">
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="E-mail@Email.com"
              value ="${email ? `${email}` : ""}"
            />
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">휴대전화</label>
        </div>
        <div class="field-body">
          <div class="control">
            <input id="phoneNumber" class="input" placeholder="-없이 적어주세요" 
              value ="${phoneNumber ? `${phoneNumber}` : ""}" 
            />
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">일반전화</label>
        </div>
        <div class="field-body">
          <div class="control">
            <input id="telNumber" class="input" placeholder="-없이 적어주세요" 
              value ="${telNumber ? `${telNumber}` : ""}" 
            />
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">요청사항</label>
        <div class="control">
          <textarea
            id="textarea"
            class="textarea"
            rows="3"
            placeholder="요청사항을 적어주세요."
          ></textarea>
        </div>
      </div>
    </section>

    <!-- 결제정보 -->
    <section id="paymentBox" class="box">
      <label id="infoLabel" class="label">결제정보</label>

      <div class="field">
        <label class="label">주문상품</label>
        <p id="productInfo">
          <b>${packageName}</b> ${days - 1}박 ${days}일<br>
          ${substance}<br>
          예약하신 인원 : ${persons}명<br>
          (총 인원 : ${countNumber}/${totalNumber}) 
        </p>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal labeInfo">
          <label class="label">상품가격</label>
        </div>
        <div class="field-body">
          <p id="productPrice" class="control price">
            ${price.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal labeInfo">
          <label class="label">유류할증료</label>
        </div>
        <div class="field-body">
          <p id="fuelSurcharge" class="control price">
            ${fuelSurcharge.toLocaleString("ko-KR")}원
          </p>
        </div>
      </div>

      <div class="field">
        <label class="label title is-4">총 결제금액</label>
        <p id="productTotalPrice">
          ${((price + fuelSurcharge) * persons).toLocaleString("ko-KR")}원
        </p>
      </div>

      <button id="orderBtn" class="button is-success">예약하기</button>
    </section>`
  );
  async function delCartToken() {
    //현재 로그인 된 토큰 가져오기
    const nowLoginIdEmail = sessionStorage.getItem("nowLoginId");
    //cart 토큰 가져오기
    const cartToken = JSON.parse(sessionStorage.getItem("cartToken"));
    if (!cartToken) return;
    const cartListData = cartToken.filter((element) => {
      return element.email === nowLoginIdEmail;
    });

    //로그인 사용자의 장바구니 리스트를 고르기
    const nowLoginCartlist = cartListData.filter(
      (element) => element.objectId === _id
    );

    //다른 사용자의 장바구니 리스트
    let otherUserCartList = cartListData.filter((element) => {
      if (nowLoginCartlist.includes(element)) return false;
    });

    //로그인 사용자 장바구니 리스트에서 선택한 장바구니를 빼기
    const nowLoginDelCartlist = cartToken.filter((element) => {
      if (nowLoginCartlist.includes(element) === false) return true;
    });

    //다른 사용자의 장바구니 리스트에 필터링한 것을 넣어서 합침
    otherUserCartList.push(...nowLoginDelCartlist);

    //그리고 모든 사용자의 장바구니 리스트로 만듦
    sessionStorage.setItem("cartToken", JSON.stringify(otherUserCartList));
  }

  async function orderFnc() {
    const phoneNum = document.querySelector("#phoneNumber").value;
    const telNumber = document.querySelector("#telNumber").value;
    const textarea = document.querySelector("#textarea").value;
    if (!phoneNum) return alert("휴대전화번호는 필수입니다.");
    if (phoneNum.match(/[^0-9]/g)) {
      return alert("휴대전화번호는 번호만 입력 가능합니다.");
    }
    if (telNumber.match(/[^0-9]/g)) {
      return alert("일반번호는 번호만 입력 가능합니다.");
    }

    //주문 날짜 구하기
    const orderDate = await new Date();

    //주문한 정보 넣기
    const orderData = {
      userName: fullName,
      email: email,
      totalNumber: persons,
      packageName: packageName,
      country: country,
      days: days,
      departureAt: departureAt,
      arrivalAt: arrivalAt,
      registerDateAt: orderDate,
      price: price,
      totalPrice: (price + fuelSurcharge) * persons,
      packageId: _id,
      message: textarea,
    };

    delCartToken();

    //주문서 업데이트하는 api
    const orederId = await Api.post("/api/order", orderData);

    //상품 카운터 바꾸는 api
    const countiedNumber = { countNumber: `${persons + countNumber}` };
    await Api.patch(`/api/packagecount`, `${_id}`, countiedNumber);

    alert(`예약이 정상적으로 완료되었습니다.\n감사합니다.`);

    //메일 보내는 api
    await Api.post(`/api/sendMail/${orederId._id}`);

    window.location.href = "/complete";
  }

  //예약하기 버튼 클릭
  orderBtn.addEventListener("click", orderFnc);
}
renderHtml();
const userNavbarDiv = document.querySelector(".navbar-end");
userNavbarDiv.insertAdjacentElement("beforeend", renderUserNavbar());
