import pkg from 'mongoose';
const { model } = pkg;
import { OrderSchema } from "../schemas/order-schema.js";

const Order = model("order", OrderSchema);

export class OrderModel {

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
