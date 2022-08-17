import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { adminRequired, loginRequired, errorHandler } from "../middlewares";
import { orderService } from "../services";

const orderRouter = Router();

// 주문 생성
orderRouter.post("/order", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const userName = req.body.userName;
    const email = req.body.email;
    const totalNumber = req.body.totalNumber;
    const packageName = req.body.packageName;
    const category = req.body.category;
    const country = req.body.country;
    const days = req.body.days;
    const departureAt = req.body.departureAt;
    const arrivalAt = req.body.arrivalAt;
    const registerDateAt = req.body.registerDateAt;
    const price = req.body.price;
    const totalPrice = req.body.totalPrice;
    const packageId = req.body.packageId;

    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      userName,
      email,
      totalNumber,
      packageName,
      category,
      country,
      days,
      departureAt,
      arrivalAt,
      registerDateAt,
      price,
      totalPrice,
      packageId,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 전체 주문 목록을 가져옴 (배열 형태임)
orderRouter.get("/orders", adminRequired, async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const orders = await orderService.getOrders(req.query);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// 전체 주문 목록을 가져옴 (배열 형태임)
orderRouter.get("/orders/forUser", async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const orders = await orderService.getOrders(req.query);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

//주문 ID로 정보가져오기
orderRouter.get("/order/:orderId", async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const orderId = req.params.orderId;

    const getId = await orderService.getOrderId(orderId);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(getId);
  } catch (error) {
    next(error);
  }
});

// 아직 수정안함
// 상품 정보 수정
// (예를 들어 /api/package/abc12345 로 요청하면 req.params.packageId는 'abc12345' 문자열로 됨)
orderRouter.patch("/orders/:orderId", async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // params로부터 id를 가져옴
    const packageId = req.params.packageId;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const packageName = req.body.packageName;
    const category = req.body.category;
    const country = req.body.country;
    const price = req.body.price;
    const days = req.body.days;
    const departureAt = req.body.departureAt;
    const arrivalAt = req.body.arrivalAt;
    const totalNumber = req.body.totalNumber;
    const imgUrl = req.body.imgUrl;
    const substance = req.body.substance;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(packageName && { packageName }),
      ...(category && { category }),
      ...(country && { country }),
      ...(price && { price }),
      ...(days && { days }),
      ...(departureAt && { departureAt }),
      ...(arrivalAt && { arrivalAt }),
      ...(totalNumber && { totalNumber }),
      ...(imgUrl && { imgUrl }),
      ...(substance && { substance }),
    };

    // 사용자 정보를 업데이트함.
    const updatedPackageInfo = await orderService.setPackage(
      packageId,
      toUpdate
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedPackageInfo);
  } catch (error) {
    next(error);
  }
});

// 선택 주문 삭제
orderRouter.delete("/order/:orderId", async function (req, res, next) {
  try {
    // 상품 Id 얻음
    const orderId = req.params.orderId;
    const deleteorder = await orderService.DeleteOrder(orderId);
    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(deleteorder);
  } catch (error) {
    next(error);
  }
});

// 주문 확정 메일 발신
orderRouter.post("/sendMail/:orderId", async function (req, res, next) {
  try {
    const  sendedMail = await orderService.sendMail(req.params.orderId);
    
    res.status(200).json(sendedMail);
  } catch (error) {
    next(error);
  }
}, errorHandler)

export { orderRouter };
