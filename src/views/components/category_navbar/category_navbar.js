export const categories = [
  "국내",
  "아시아",
  "중국",
  "일본",
  "미주",
  "중남미",
  "유럽",
  "대양주",
  "중동",
  "아프리카",
];

export default function renderCategoryNavbar(selectedCategory) {
  const component = document.createElement("div");

  const searchInput = document.createElement("input");
  searchInput.classList.add("input", "is-rounded", "search");
  searchInput.type = "text";
  searchInput.placeholder = "Search";
  searchInput.autofocus = true;
  searchInput.onkeydown = () => {
    if (window.event.keyCode == 13) {
      onSubmitSearch();
    }
  };

  const searchButton = document.createElement("button");
  searchButton.classList.add("button", "is-info");
  searchButton.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
  searchButton.onclick = onSubmitSearch;
  function onSubmitSearch() {
    if (searchInput.value.length < 2) {
      alert("2글자 이상 입력해주세요.");
    } else {
      window.location.href = `/list?search=${searchInput.value}`;
    }
  }

  component.innerHTML = `
  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="/components/category_navbar/category_navbar.css">

  </head>
  <body>
  
  <nav class="navbar category-navbar" role="navigation" aria-label="main navigation">
  <div class="container mt-3 nav-container">
    <div class="navbar-start">   
    </div>
     </nav>
</body>
</html>
`;

  const navElement = component.getElementsByClassName("nav-container")[0];
  navElement.appendChild(searchInput);
  navElement.appendChild(searchButton);

  const navbarContainer = component.querySelector(".navbar-start");
  categories.forEach((category) => {
    const navMenuElement = document.createElement("a");
    navMenuElement.className = "navbar-item";
    navMenuElement.innerText = `${category}`;
    navMenuElement.onclick = () => onSumbitSearch(category);
    navMenuElement.href = `/list/?category=${category}&subcategory=전체`;
    navbarContainer.appendChild(navMenuElement);

    if (category === selectedCategory) {
      navMenuElement.classList.add("is-active");
    }
  });

  return component;
}
