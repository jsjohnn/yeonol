import * as Api from "/api.js";

const category = await Api.get("/api/category/purelist");
// const subcategory = await Api.get("/api/subcategory/purelist");
const containerDiv = document.getElementById("container");
category.forEach(async (element) => {
  const accordianDiv = document.createElement("div");
  const accordianItemDiv = document.createElement("div");
  const accordianHeader = document.createElement("h2");
  const button = document.createElement("button");

  accordianDiv.setAttribute("class", "accordion");
  accordianItemDiv.setAttribute("class", "accordion-item");
  accordianHeader.setAttribute("class", "accordion-header");
  button.setAttribute("class", "accordion-button");
  button.setAttribute("type", "button");
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", `#category-${element.categoryName}`);
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-controls", `category-${element.categoryName}`);

  button.textContent = `${element.categoryName}`;

  containerDiv.appendChild(accordianDiv);
  accordianDiv.appendChild(accordianItemDiv);
  accordianItemDiv.appendChild(accordianHeader);
  accordianHeader.appendChild(button);

  const subcategories = await Api.get(`/api/subcategory/${element.categoryId}`);
  subcategories.forEach((data) => {
    const accordianCollapseDiv = document.createElement("div");
    const accordianBodyDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const modifyBtn = document.createElement("button");

    accordianCollapseDiv.setAttribute("class", "accordion-collapse collapse");
    accordianCollapseDiv.setAttribute("id", `category-${element.categoryName}`);
    accordianBodyDiv.setAttribute("class", "accordion-body");
    deleteBtn.setAttribute("style", "float:right");
    modifyBtn.setAttribute("style", "float:right");

    accordianBodyDiv.textContent = `${data.subCategoryName}`;
    deleteBtn.textContent = "삭제";
    modifyBtn.textContent = "수정";

    accordianItemDiv.appendChild(accordianCollapseDiv);
    accordianCollapseDiv.appendChild(accordianBodyDiv);
    accordianBodyDiv.appendChild(deleteBtn);
    accordianBodyDiv.appendChild(modifyBtn);
  });
});

// subcategory.forEach((element) => {
//   console.log(element.subCategoryName);
// });
