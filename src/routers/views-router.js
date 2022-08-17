import express from "express";
import path from "path";

const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use("/", serveStatic("home"));
viewsRouter.use("/register", serveStatic("register"));
viewsRouter.use("/login", serveStatic("login"));
viewsRouter.use("/list", serveStatic("list"));

viewsRouter.use("/account", serveStatic("account"));
viewsRouter.use("/account/orders", serveStatic("account/orders"));
viewsRouter.use("/account/deleteAccount", serveStatic("account/deleteAccount"));
viewsRouter.use("/account/sell", serveStatic("account/sell"));
viewsRouter.use("/account/userUpdate", serveStatic("account/userUpdate"));
viewsRouter.use("/account/adminUpdate", serveStatic("account/adminUpdate"));
viewsRouter.use(
  "/account/adminCategoryUpdate",
  serveStatic("account/adminCategoryUpdate")
);

viewsRouter.use("/product/detail/:id", serveStatic("product/detail"));
viewsRouter.use("/order/:id", serveStatic("order"));
viewsRouter.use("/complete", serveStatic("complete"));
viewsRouter.use("/cart", serveStatic("cart"));
viewsRouter.use("/userupdate", serveStatic("userupdate"));
viewsRouter.use("/sell", serveStatic("sell"));
viewsRouter.use("/deleteAccount", serveStatic("deleteAccount"));

// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use("/", serveStatic(""));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  // ../views/product/detail
  let option = { index: `${resource}.html` };

  // /product/detail라는 경로를 쓰기위함. detail.html으로 출력
  if (resource.includes("/") ? true : false) {
    const resourceSplit = resource.split("/")[1];
    option = { index: `${resourceSplit}.html` };
  }

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
