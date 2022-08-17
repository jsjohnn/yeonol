// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import renderImageItem from "/components/list/image-item-card.js";
import renderItem from "/components/list/item-card.js";
import renderCategoryNavbar from "/components/category_navbar/category_navbar.js";
import renderUserNavbar from "../components/user_navbar/user_navbar.js";

import * as Api from "/api.js";

// 요소(element), input 혹은 상수
const itemScrollListDiv = document.querySelector(".item-scroll-list");
const leftArrowBtn = document.querySelector("#left-arrow");
const rightArrowBtn = document.querySelector("#right-arrow");

const itemListDiv = document.querySelector(".item-list");

const categoryNavbarDiv = document.querySelector(".category-navbar");
const userNavbarDiv = document.querySelector(".navbar-end");
addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertItemsToScrollList();
  insertItemsToList();
  insertCategoryNavbar();
  insertUserNavbar();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  leftArrowBtn.addEventListener("click", () => onHoverScrollArrow("left"));
  rightArrowBtn.addEventListener("click", () => onHoverScrollArrow("right"));
}

async function insertItemsToScrollList() {
  let itemsData = await fetch("recommended.json").then((response) =>
    response.json()
  );
  itemsData.forEach((data) => {
    itemScrollListDiv.insertAdjacentElement(
      "beforeend",
      renderImageItem(data, () => {
        window.location.href = `/list/?category=${data.category}&subcategory=${data.name}`;
      })
    );
  });
}

async function insertItemsToList() {
  const pageckages = await Api.get("/api/packages");

  pageckages.forEach((data) => {
    itemListDiv.insertAdjacentElement("beforeend", renderItem(data));
  });
}

function insertCategoryNavbar() {
  categoryNavbarDiv.insertAdjacentElement("beforeend", renderCategoryNavbar());
}

function insertUserNavbar() {
  userNavbarDiv.insertAdjacentElement("beforeend", renderUserNavbar());
}

function onHoverScrollArrow(direction) {
  let distance;
  switch (direction) {
    case "right":
      distance = 500;
      break;
    case "left":
      distance = -500;
  }
  itemScrollListDiv.scrollBy({ left: distance, behavior: "smooth" });
}
