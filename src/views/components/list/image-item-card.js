export default function renderImageItem(data, onClick) {
  const component = document.createElement("div");
  component.class = "card";
  component.onclick = onClickHandler;

  function onClickHandler() {
    onClick();
  }

  component.innerHTML = `
  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="/components/list/image-item-card.css">
  </head>
  <body>
  <div class="card image-card">
  <div class="card-background">
      <img class="card-background-image" src=${data.image} alt="Placeholder image">
  </div>
  <div class="content-stack">
    <h1>${data.name_en}</h1>
    <b>${data.description}</b>
  </div>
</div>
</body>
</html>
`;

  return component;
}
