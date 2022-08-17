// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import renderItem from "/components/list/item-card.js";
import renderCategoryNavbar from "/components/category_navbar/category_navbar.js";

import * as Api from "/api.js";
import getParams from "../get_params.js";
import renderDropdown from "../components/dropdown/dropdown.js";
import renderUserNavbar from "../components/user_navbar/user_navbar.js";
// 요소(element), input 혹은 상수
const itemListContainer = document.querySelector(".item-list-container");
const itemListDiv = document.querySelector(".item-list");
const dropdownDiv = document.querySelector(".dropdown-container");

const categoryNavbarDiv = document.querySelector(".category-navbar");
const titleText = document.getElementById("title");
const userNavbarDiv = document.querySelector(".navbar-end");
let params = getParams();
addAllElements();
addAllEvents();
// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertCategoryNavbar();
  insertTitleText();
  if (params.category === undefined) {
    insertSearchedItemsToList(params.search);
  } else {
    insertItemsToList(params.subcategory);
    insertDropdown(params.subcategory);
  }
  insertUserNavbar();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {}

function insertTitleText() {
  if (params.category === undefined)
    titleText.innerText = `${params.search}의 검색 결과입니다.`;
  else titleText.innerText = `${params.category} 여행 떠나요!`;
}
async function insertSearchedItemsToList(value) {
  const pageckages = await Api.get("/api/packages");

  const fliteredPageckages = pageckages.filter(
    (e) => e.substance.includes(value) || e.packageName.includes(value)
  );

  fliteredPageckages.forEach((pageckages) => {
    itemListDiv.insertAdjacentElement("beforeend", renderItem(pageckages));
  });

  if (fliteredPageckages.length === 0) {
    itemListContainer.innerHTML = "일치하는 항목이 없습니다.";
  }
}

async function insertItemsToList(subCategory) {
  itemListDiv.innerHTML = "";
  const pageckages = await Api.get("/api/packages");

  pageckages
    .filter((e) =>
      subCategory === "전체" || subCategory === undefined
        ? e.category === params.category
        : e.category === params.category && e.packageName === subCategory
    )
    .forEach((pageckages) => {
      itemListDiv.insertAdjacentElement("beforeend", renderItem(pageckages));
    });
}

function insertCategoryNavbar() {
  categoryNavbarDiv.insertAdjacentElement(
    "beforeend",
    renderCategoryNavbar(params.category)
  );
}

async function insertDropdown() {
  let data = await Api.get("/api/category/list");
  const subCategories = data.find((e) =>
    Object.keys(e).includes(params.category)
  )[params.category];

  dropdownDiv.insertAdjacentElement(
    "beforeend",
    renderDropdown(subCategories, params.subcategory, (selected) => {
      window.location.href = `/list/?category=${params.category}&subcategory=${selected}`;
    })
  );
}

function insertUserNavbar() {
  userNavbarDiv.insertAdjacentElement("beforeend", renderUserNavbar());
}
