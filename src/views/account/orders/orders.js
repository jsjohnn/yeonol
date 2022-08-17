import * as Api from "/api.js";

const ordersContainer = document.getElementById("ordersContainer");
const today = new Date();
const todayDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const nowLoginId = sessionStorage.getItem("nowLoginId");

// 로그인한 사용자의 주문을 조회하는 페이지 로딩
async function loadPage() {
  const res = await Api.get("/api/orders/forUser", `?email=${nowLoginId}`);

  res.forEach((data) => {
    
    const date = data.departureAt.substr(0, 10);
    const departureAt = new Date(data.departureAt);

    if (data.email == nowLoginId) {
      if (today < departureAt) {
        const orderItemBox = document.createElement("div");
        const dateDiv = document.createElement("div");
        const packageNameDiv = document.createElement("div");
        const productStatusDiv = document.createElement("div");
        const deleteBtnDiv = document.createElement("div");
        const deleteBtn = document.createElement("button");

        orderItemBox.setAttribute("class", "columns orders-item");
        orderItemBox.setAttribute("id", `${data._id}`);
        dateDiv.setAttribute("class", "column is-2");
        packageNameDiv.setAttribute("class", "column is-6");
        productStatusDiv.setAttribute("class", "column is-2");
        deleteBtnDiv.setAttribute("class", "column is-2");
        deleteBtn.setAttribute("class", "button");
        deleteBtn.setAttribute("id", `deleteButton-${data._id}`);

        dateDiv.textContent = `${date}`;
        packageNameDiv.textContent = `${data.packageName}`;
        productStatusDiv.textContent = "상품 준비중";
        deleteBtn.textContent = "주문 취소";

        ordersContainer.appendChild(orderItemBox);
        orderItemBox.appendChild(dateDiv);
        orderItemBox.appendChild(packageNameDiv);
        orderItemBox.appendChild(productStatusDiv);
        orderItemBox.appendChild(deleteBtnDiv);
        deleteBtnDiv.appendChild(deleteBtn);

        const deleteButton = document.querySelector(
          `#deleteButton-${data._id}`
        );
        
        deleteButton.addEventListener("click", async function () {
          const res = await fetch(`/api/order/${data._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
          alert(`주문을 취소하였습니다.`);
          window.location.href = "/account/orders";
        });
      }
    }
  });
}

// 로그인한 사용자가 관리자 일때 모든 주문을 조회하는 페이지 로딩
async function adminPageLoad() {
  const res = await Api.get("/api", "orders");
  // const result = await res.json();
  
  // const fetchData = await fetch("../orders_sample.json").then((response) =>
  //   response.json()
  // );
  const category = document.querySelector("#category");
  category.innerHTML = `
            <div class="column is-2">출발일</div>
            <div class="column is-4">상품 명</div>
            <div class="column is-2">신청자 아이디</div>
            <div class="column is-2">상태</div>
            <div class="column is-2">신청</div>
  `;

  res.forEach((data) => {
    const date = data.departureAt.substr(0, 10);
    const departureAt = new Date(data.departureAt);

    if (today < departureAt) {
      const orderItemDiv = document.createElement("div");
      const dateDiv = document.createElement("div");
      const packageNameDiv = document.createElement("div");
      const emailDiv = document.createElement("div");
      const productStatusDiv = document.createElement("div");
      const deleteBtnDiv = document.createElement("div");
      const deletebtn = document.createElement("button");

      orderItemDiv.setAttribute("class", "columns orders-item");
      orderItemDiv.setAttribute("id", `${data._id}`);
      dateDiv.setAttribute("class", "column is-2");
      packageNameDiv.setAttribute("class", "column is-4");
      emailDiv.setAttribute("class", "column is-2");
      productStatusDiv.setAttribute("class", "column is-2");
      deleteBtnDiv.setAttribute("class", "column is-2");
      deletebtn.setAttribute("class", "button");
      deletebtn.setAttribute("id", `deleteButton-${data._id}`);

      dateDiv.textContent = `${date}`;
      packageNameDiv.textContent = `${data.packageName}`;
      emailDiv.textContent = `${data.email}`;
      productStatusDiv.textContent = "상품 준비중";
      deletebtn.textContent = "주문 취소";

      ordersContainer.appendChild(orderItemDiv);
      orderItemDiv.appendChild(dateDiv);
      orderItemDiv.appendChild(packageNameDiv);
      orderItemDiv.appendChild(emailDiv);
      orderItemDiv.appendChild(productStatusDiv);
      orderItemDiv.appendChild(deleteBtnDiv);
      deleteBtnDiv.appendChild(deletebtn);

      const deleteButton = document.querySelector(`#deleteButton-${data._id}`);
      
      deleteButton.addEventListener("click", async function () {
        const res = await fetch(`/api/order/${data._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        alert(`삭제함`);
        window.location.href = "/account/orders";
      });
    }
  });
}

async function pageload() {
  const loginId = sessionStorage.getItem("nowLoginId");
  const res = await fetch(`/api/useremail/${loginId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }
  const result = await res.json();
  if (result.role == "admin") {
    //관리자인지 확인
    adminPageLoad();
    // 관리자가 맞다면 adminPageLoading()
  } else {
    loadPage();
    // 관리자가 아니라면 loadPage()
  }
}

pageload();
