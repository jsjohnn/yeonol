import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalNumber: {
    type: Number,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  departureAt: {
    type: Date,
    required: true,
  },
  arrivalAt: {
    type: Date,
    required: true,
  },
  registerDateAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  packageId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "package",
  },
});

// mongoose.model("PackageSchema");

export { OrderSchema };
