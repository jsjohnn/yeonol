export default function renderItem(data) {
  const component = document.createElement("div");
  component.class = "card";
  component.onclick = onClickHandler;

  function onClickHandler() {
    window.location.href = `/product/detail/${data._id}`;
  }

  component.innerHTML = `
    <html>
    <head>
     <link rel="stylesheet" type="text/css" href="/components/list/item-card.css">
    </head>
    <body>
    <div class="card card-panel">
  <div class="card-image">
    <figure class="image is-4by3">
      <img class="card-panel-image" src=${
        data.imgUrl ?? ""
      } alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="has-text-grey-light">${data.category} / ${data.country}</p>
        <p class="title is-5">${data.packageName}</p>
      </div>
    </div>

    <div class="content">
    <p class="has-text-grey-light">${
      data.departureAt &&
      `${data.departureAt.split("T")[0]} ~ ${data.arrivalAt.split("T")[0]}`
    }</p>

    <b class="has-text-black">${data.price.toLocaleString()}원</b>
    </div>
  </div>
</div>
</body>
</html>`;

  return component;
}
