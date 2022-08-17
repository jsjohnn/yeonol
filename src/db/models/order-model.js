import { model } from "mongoose";
const mongoose = require("mongoose");
import { OrderSchema } from "../schemas/order-schema";
import { PackageSchema } from "../schemas/package-schema";

const Order = model("order", OrderSchema);

export class OrderModel {
  async findByUserName(orderName) {
    const UserName = await Order.findOne({ userName: userName });
    return UserName;
  }

  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  async findAll(query) {
    const orders = await Order.find(query);
    return orders;
  }
  async findById(orderId) {
    const findorder = await Order.findOne({ _id: orderId }).populate(
      "packageId"
    );
    return findorder;
  }

  async update({ orderId, update }) {
    const filter = { _id: orderId };

    const updatedOrder = await Order.findOneAndUpdate(filter, update);
    return updatedOrder;
  }

  async delete(orderId) {
    const deleteorder = await Order.findByIdAndDelete({
      _id: orderId,
    });
    return deleteorder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
