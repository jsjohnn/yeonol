import * as Api from "/api.js";

async function pageLoad() {
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
    const subcategories = await Api.get(
      `/api/subcategory/${element.categoryId}`
    );
    subcategories.forEach((data) => {
      const accordianCollapseDiv = document.createElement("div");
      const accordianBodyDiv = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const modifyBtn = document.createElement("button");

      accordianCollapseDiv.setAttribute("class", "accordion-collapse collapse");
      accordianCollapseDiv.setAttribute(
        "id",
        `category-${element.categoryName}`
      );
      accordianBodyDiv.setAttribute("class", "accordion-body");
      deleteBtn.setAttribute("style", "float:right");
      modifyBtn.setAttribute("style", "float:right");
      modifyBtn.setAttribute("data-bs-toggle", "modal");
      modifyBtn.setAttribute("data-bs-target", "#exampleModal");

      accordianBodyDiv.textContent = `${data.subCategoryName}`;
      deleteBtn.textContent = "삭제";
      modifyBtn.textContent = "수정";
      deleteBtn.addEventListener("click", addDeleteCategoryEvent);
      modifyBtn.addEventListener("click", addModifyCategoryEvent);

      accordianItemDiv.appendChild(accordianCollapseDiv);
      accordianCollapseDiv.appendChild(accordianBodyDiv);
      accordianBodyDiv.appendChild(deleteBtn);
      accordianBodyDiv.appendChild(modifyBtn);

      async function addDeleteCategoryEvent() {
        alert(data.subCategoryName + "을 삭제 하시겠습니까?");
        await Api.delete("/api", "subcategory", {
          subCategoryName: data.subCategoryName,
        });
        alert(data.subCategoryName + "을 삭제 했습니다.");
        window.location.reload();
      }

      async function addModifyCategoryEvent(e) {
        const subCategoryName = document.getElementById("subcategoryName");
        subCategoryName.textContent = `${data.subCategoryName}`;

        const modalInput = document.getElementById("modalInput");
        console.log(modalInput);

        const saveChangeBtn = document.getElementById("saveChangeBtn");
        saveChangeBtn.addEventListener("click", async () => {
          alert(
            `${data.subCategoryName}을 ${modalInput.value}로 바꾸시겠습니까?`
          );
          await Api.patch(
            "/api",
            `subcategory?curSubCategoryName=${data.subCategoryName}&updatedSubCategoryName=${modalInput.value}`
          );
          alert("수정 완료 했습니다.");
          window.location.reload();
        });
      }
    });
  });
}

pageLoad();
