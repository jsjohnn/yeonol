import * as Api from "/api.js";

const packageNameInput = document.querySelector("#packageNameInput");
const categorySelectBox = document.querySelector("#categorySelectBox");
const subCategorybox = document.querySelector("#subCategorybox");
const priceInput = document.querySelector("#priceInput");
const detailDescriptionInput = document.querySelector(
  "#detailDescriptionInput"
);
const totalInput = document.querySelector("#totalInput");
const departureAt = document.querySelector("#departureAt");
const arriveAt = document.querySelector("#arriveAt");
const imageInput = document.getElementById("imageInput");
const submitButton = document.querySelector("#submitButton");

// packageName,category,country,price,days,departureAt,arrivalAt,totalNumber,
// imgUrl,substance,

submitButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const image = imageInput.files[0];
  const formData = new FormData();
  formData.append("image", image);
  formData.append("packageName", packageNameInput.value);
  formData.append(
    "category",
    categorySelectBox.options[categorySelectBox.selectedIndex].value
  );
  formData.append(
    "country",
    subCategorybox.options[subCategorybox.selectedIndex].value
  );
  formData.append("price", priceInput.value);
  formData.append("days", 3);
  formData.append("departureAt", departureAt.value);
  formData.append("arrivalAt", arriveAt.value);
  formData.append("totalNumber", totalInput.value);
  formData.append("substance", detailDescriptionInput.value);

  //   const bodyData = {
  //     packageName: packageNameInput.value,
  //     category: categorySelectBox.options[categorySelectBox.selectedIndex].value,
  //     country: subCategorybox.options[subCategorybox.selectedIndex].value,
  //     price: priceInput.value,
  //     days: 3,
  //     departureAt: departureAt.value,
  //     arrivalAt: arriveAt.value,
  //     totalNumber: totalInput.value,
  //     imgUrl: formData,
  //     substance: detailDescriptionInput.value,
  //   };
 
  //   addPackage(formData);
  try {
    const res = await Api.postForm("/api/package", formData);
    alert("성공적으로 등록되었습니다.");
    window.location.href = "/account/sell/";
    // location.href = '/admin/product/add/';
  } catch (error) {
    
  }
});

// 국가 카테고리와 서브 카테고리 option넣어주는 것들 <option value="국내">국내</option>
async function categoryLoad() {
  const res = await Api.get("/api/category", "list");
  categorySelectBox.innerHTML = `<option value="국가를 선택">국가를 선택하세요</option>`;
  res.forEach((data) => {
    
    categorySelectBox.innerHTML += `
        <option value="${Object.keys(data)[0]}">${Object.keys(data)[0]}</option>
        `;
  });
}

async function subcategoryLoad() {
  
  const categoryValue =
    categorySelectBox.options[categorySelectBox.selectedIndex].value;
  subCategorybox.innerHTML = "";
  const res = await Api.get("/api/category", "list");

  

  res.forEach((data) => {
    if (Object.keys(data)[0] == categoryValue) {
      for (let i = 0; i < Object.values(data)[0].length; i++) {
        subCategorybox.innerHTML += `
        <option value="${Object.values(data)[0][i]}">${
          Object.values(data)[0][i]
        }</option>
        `;
      }
    }
  });
  
}

categorySelectBox.onchange = subcategoryLoad;

categoryLoad();
