// import jwt from "jsonwebtoken";

// const userToken = req.headers["authorization"]?.split(" ")[1];
// const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
//     const jwtDecoded = jwt.verify(userToken, secretKey);

//     const userId = jwtDecoded.userId;
//     const userRole = jwtDecoded.role;

import renderUserNavbar from "../../components/user_navbar/user_navbar.js";
const menuContainer = document.querySelector("#menu-container");

async function adminPage() {
  // TODO : 관리자인지 확인하는 api를 사용해서 관리지안지 확인,
  //        임의로 로그인한 이메일이 ekdh0858@naver.com이면 관리자로 인지.
  //-----------------------------------------------------------------------//
  // api로 사용자의 정보를 불러옴
  // 불러온 사용자의 role부분이 user-admin인지 확인
  // role부분이 user-admin이 맞다면 관리자 계정인것임.
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

  //------------------------------------------------------------------------//

  if (result.role == "admin") {
    // 관리자 페이지를 확인하고 싶으시다면 if조건문 안에 이메일을 로그인할 이메일로 바꿔주심 됩니다.
    menuContainer.innerHTML += `
        
          <a class="menu-card" href="/account/adminUpdate">
            <div class="menu-icon">
              <span class="icon has-text-info">
              <i class="fa-solid fa-person-circle-plus"></i>
              </span>
            </div>
            <div class="menu-body">
              <p class="title is-3">관리자 관리</p>
              <p class="subtitle is-5">관리자 임명을 할 수 있습니다.</p>
            </div>
          </a>

          <a class="menu-card" href="/account/adminCategoryUpdate">
            <div class="menu-icon">
              <span class="icon has-text-info">
              <i class="fa-solid fa-user-plus"></i>
              </span>
            </div>
            <div class="menu-body">
              <p class="title is-3">카테고리 관리</p>
              <p class="subtitle is-5">관리자가 카테고리관리를 수정,삭제, 추가 할 수 있습니다.</p>
            </div>
          </a>
        `;
  }
}

adminPage();

let loginCheck = document.querySelector(".navbar-end");
loginCheck.insertAdjacentElement("beforeend", renderUserNavbar());
