import * as Api from "/api.js";

const usersContainer = document.getElementById("usersContatiner");

async function loadPage() {
  const res = await Api.get("/api/users");
  res.forEach((element) => {
    console.log(element);
    const userBox = document.createElement("div");
    const nameDiv = document.createElement("div");
    const emailDiv = document.createElement("div");
    const roleDiv = document.createElement("div");
    const activeDiv = document.createElement("div");
    const buttonsDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const activeBtn = document.createElement("button");

    userBox.setAttribute("class", "columns orders-item");
    nameDiv.setAttribute("class", "column is-2");
    emailDiv.setAttribute("class", "column is-4");
    roleDiv.setAttribute("class", "column is-2");
    activeDiv.setAttribute("class", "column is-2");
    buttonsDiv.setAttribute("class", "column is-2");
    deleteBtn.setAttribute("class", "button");
    deleteBtn.setAttribute("id", `${element._id}`);
    activeBtn.setAttribute("class", "button");

    nameDiv.textContent = `${element.fullName}`;
    emailDiv.textContent = `${element.email}`;
    roleDiv.textContent = `${element.role}`;
    activeDiv.textContent = "활동중";
    deleteBtn.textContent = "회원 삭제";
    activeBtn.textContent = "제제";

    usersContainer.appendChild(userBox);
    userBox.appendChild(nameDiv);
    userBox.appendChild(emailDiv);
    userBox.appendChild(roleDiv);
    userBox.appendChild(nameDiv);
    userBox.appendChild(activeDiv);
    userBox.appendChild(buttonsDiv);
    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(activeBtn);

    // TODO: 관리자용 사용자 삭제 API만들기 -> 관리자는 사용자의 비밀번호를 모름.
    deleteBtn.addEventListener("click", async function () {
      await Api.delete();
    });
  });
}

loadPage();
