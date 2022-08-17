import { orderModel } from "../db";
import nodemailer from "nodemailer";

class OrderService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 패키지 생성
  async addOrder(orderInfo) {
    // 객체 destructuring
    const {
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
    } = orderInfo;

    const newOrderInfo = {
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
    };

    // db에 저장
    const createdNewOrder = await this.orderModel.create(newOrderInfo);

    return createdNewOrder;
  }
  // 상품 목록 전체 가져옴
  async getOrders(query) {
    const orders = await this.orderModel.findAll(query);
    return orders;
  }
  // 상품 Id로 검색
  async getOrderId(OrderId) {
    const findOrder = await this.orderModel.findById(OrderId);

    return findOrder;
  }

  // 상품 목록 수정
  async setOrder(orderInfoRequired, toUpdate) {
    // 객체 destructuring
    const orderId = orderInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let orders = await this.orderModel.findById(orderId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!orders) {
      throw new Error("상품 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 업데이트 진행
    orders = await this.orderModel.update({
      packageId: orderId,
      update: toUpdate,
    });

    return orders;
  }

  // 상품 삭제
  async DeleteOrder(orderdate) {
    // 객체 destructuring
    const orderId = orderdate;

    // db에 저장
    const deleteOrder = await this.orderModel.delete(orderId);

    return deleteOrder;
  }

  // 주문 완료 메일 전송 
  async parseOrderAndSend(order) {
    const transporter = nodemailer.createTransport({
      service: 'Naver',
      host: 'smtp.naver.com',
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_USER_PW
      },
    })

    const info = await transporter.sendMail({
      from: `"여기서놀자" <ehdghkk21@naver.com>`,
      to: `${order.email}`,
      subject: '여기서놀자 예약이 완료되었습니다.',
      html: `
        <h1>${order.userName}님,</h1>
        <h2>${order.days - 1}박 ${order.days}일의 ${order.packageName}여행 상품의 예약/결제가 완료되었습니다.</h2>
        <div>==============================</div>
        <div>-예약번호: ${order._id}</div>
        <div>-예약자명: ${order.userName}</div>
        <div>-인원수: ${order.totalNumber}</div>
        <div>-출발일: ${order.departureAt.toISOString().substring(0,10)}</div>
        <div>-도착일: ${order.arrivalAt.toISOString().substring(0,10)}</div>
        <div>-금액: ${order.price.toLocaleString()}원</div>
        <div>-총액: ${order.totalPrice.toLocaleString()}원</div>
        <div>==============================</div>

        <h3>여기서놀자를 이용해 주셔서 감사합니다.<h3>
        <h3>여기서놀자</h3>
      `
    });

    return info;

 }
  // 메일 발송 - parseOrderAndSend에 주문 데이터를 넣어 호출
  async sendMail(orderId) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new Error("주문 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    const sendedMail = await this.parseOrderAndSend(order);

    return sendedMail;

  }
  
}

const orderService = new OrderService(orderModel);

export { orderService };
