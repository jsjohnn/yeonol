import renderUserNavbar from "/components/user_navbar/user_navbar.js";
import * as Api from "/api.js";

async function compareDate(departureAt) {
  const departureDate = await departureAt
    .split("-")
    .map((elem) => Number(elem));

  const date = new Date();
  //년도 비교
  if (departureDate[0] < date.getFullYear()) return false;
  //월 비교
  if (departureDate[1] < date.getMonth() + 1) return false;
  //일 비교
  if (departureDate[1] === date.getMonth() + 1) {
    if (departureDate[2] < date.getDay()) return false;
  }
  return true;
}

async function Data() {
  /* url받기 */

  /* url분리해서 맨끝 상품번호만 빼기 */
  const urlPathname = window.location.pathname;
  // result : /product/detail/629dbba1251a88738ef214b6/
  const productId = urlPathname
    .split("/")
    .filter((element) => element !== "")[2];

  /* 상품 번호로 상품 정보 불러오기 */
  const res = await Api.get("/api/package", productId);
  const { packageName, days, totalNumber, countNumber, imgUrl, substance } =
    res;
  const price = res.price.toLocaleString("ko-KR");
  const departureAt = res.departureAt.split("T")[0];
  const arrivalAt = res.arrivalAt.split("T")[0];

  //지난 상품 찾기 기능
  const compareResult = await compareDate(departureAt);
  if (!compareResult) {
    alert("출발일이 지난 상품입니다.");
    return history.back();
  }
  /* 아래 html을 삽입 */
  const body = document.querySelector("body");
  body.insertAdjacentHTML(
    "beforeend",

    `<article id="container" class="p-6" >
      <section id="inner" class="columns" >
        <div id="imgArea" class="column is-half">
          <figure class="image is-400x400">
            <img src="${imgUrl}" alt="상품 이미지">
          </figure>
        </div>
        <div id="textArea" class="column is-half">
          <div class="mb-6">
            <h3 class="title is-3">
              ${days - 1}박${days}일의 ${packageName}여행
            </h3>
            <hr>
            <div id="tourDes">
              <p class="title is-5 has-text-left">여행 기간 : ${departureAt} ~ ${arrivalAt}</p>
              <p class="title is-5 has-text-left">가격 : ${price}원</p>
              <p>${substance}</p>
            </div>
            <hr class="mt-6">
            <div class="mt-1 pt-1">
              <label id="howPerson" for="howPerson">예약현황 : </label>
              <input id="howPersonInput" class="input is-info" type="text" placeholder="잔여 예약원은  ${
                totalNumber - countNumber
              }명입니다." <br>
            </div>
          </div>
        </div>
        
        
      </section>
    
      <section id="btnArea" class="columns">
        <div class="column is-half"></div>
        <div id="btnBox" class="column">
          <button id="cartAddBtn" class="button is-warning">장바구니 추가</button>
          <button id="orderBtn" class="button is-success">예약하러가기</button>
        </div>
      </section>
    </article>
  `
  );

  /* 버튼을 위한 dom 가져오기 */
  const cartAddBtn = document.querySelector("#cartAddBtn");
  const orderBtn = document.querySelector("#orderBtn");
  const howPersonInput = document.querySelector("#howPersonInput");

  //로그인 중인지 체크
  function loginCheck() {
    if (!sessionStorage.getItem("token")) {
      alert(`로그인된 사용자만 사용 가능합니다.`);
      return false;
    }
    return true;
  }

  //인원 체크하는 기능
  function personsCheck(persons, maxPersons) {
    if (persons === 0) {
      alert(`인원을 ${persons}명을 입력하셨습니다.`);
      return false;
    }
    if (persons > maxPersons) {
      alert(`예약 인원을 초과하셨습니다.`);
      return false;
    }
    return true;
  }

  //버튼 클릭시 토큰 생성
  function createdToken(persons) {
    const nowLoginIdEmail = sessionStorage.getItem("nowLoginId");
    const cartToken = [];
    const obj = {
      email: nowLoginIdEmail,
      objectId: productId,
      persons: persons,
    };
    if (sessionStorage.getItem("cartToken")) {
      const sessionCartToken = JSON.parse(sessionStorage.getItem("cartToken"));
      //같은 사용자가 같은 상품을 카트에 담으면 패스함
      if (sessionCartToken.find((element) => element.objectId === productId)) {
        const sameProduct = sessionCartToken.filter(
          (element) => element.objectId === productId
        );
        if (sameProduct.find((element) => element.email === nowLoginIdEmail)) {
          return;
        }
      }
      cartToken.push(...sessionCartToken);
    }
    cartToken.push(obj);
    sessionStorage.setItem("cartToken", JSON.stringify(cartToken));
  }

  //장바구니추가 버튼 기능
  function cartAddFnc() {
    const persons = Number(howPersonInput.value);
    const maxPersons = totalNumber - countNumber;

    if (!loginCheck()) return;
    if (!personsCheck(persons, maxPersons)) return;
    createdToken(persons);
    alert("장바구니에 담으셨습니다.");
  }

  //예약하러가기 버튼 기능
  async function orderFnc() {
    // const loginChecking = loginCheck();

    const persons = Number(howPersonInput.value);
    const maxPersons = totalNumber - countNumber;
    // const personsChecking = personsCheck(persons, maxPersons);

    if (!loginCheck()) return;
    if (!personsCheck(persons, maxPersons)) return;
    createdToken(persons);
    window.location.href = `/order/${productId}`; //-> veiws/order/order.html
  }

  cartAddBtn.addEventListener("click", cartAddFnc);
  orderBtn.addEventListener("click", orderFnc);
}
Data();

const loginCheck = document.querySelector(".navbar-end");
loginCheck.insertAdjacentElement("beforeend", renderUserNavbar());
