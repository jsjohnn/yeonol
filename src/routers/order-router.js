import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { adminRequired, errorHandler } from "../middlewares/index.js";
import { orderService } from "../services/index.js";

const orderRouter = Router();

orderRouter.post("/order", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

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

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/orders", adminRequired, async function (req, res, next) {
  try {
    const orders = await orderService.getOrders(req.query);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/orders/forUser", async function (req, res, next) {
  try {
    const orders = await orderService.getOrders(req.query);

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

//주문 ID로 정보가져오기
orderRouter.get("/order/:orderId", async function (req, res, next) {
  try {
    const orderId = req.params.orderId;

    const getId = await orderService.getOrderId(orderId);

    res.status(200).json(getId);
  } catch (error) {
    next(error);
  }
});


orderRouter.patch("/orders/:orderId", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const packageId = req.params.packageId;

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

    const updatedPackageInfo = await orderService.setPackage(
      packageId,
      toUpdate
    );

    res.status(200).json(updatedPackageInfo);
  } catch (error) {
    next(error);
  }
});

orderRouter.delete("/order/:orderId", async function (req, res, next) {
  try {
    const orderId = req.params.orderId;
    const deleteorder = await orderService.DeleteOrder(orderId);

    res.status(200).json(deleteorder);
  } catch (error) {
    next(error);
  }
});

orderRouter.post("/sendMail/:orderId", async function (req, res, next) {
  try {
    const sendedMail = await orderService.sendMail(req.params.orderId);

    res.status(200).json(sendedMail);
  } catch (error) {
    next(error);
  }
}, errorHandler)

export { orderRouter };
