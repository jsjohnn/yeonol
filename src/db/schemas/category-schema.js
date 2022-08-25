import pkg from 'mongoose';
const { Schema } = pkg;
// import mongoose from "mongoose";
// import autoIncrement from "mongoose-auto-increment";
// autoIncrement.initialize(mongoose.connection);

const CategorySchema = new Schema(
  {
    categoryId: {
      type: Number,
      default: 0,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    collection: "categories",
    versionKey: false,
    timestamps: true,
  }
);

// CategorySchema.plugin(autoIncrement.plugin, {
//   model: "Category",
//   field: "categoryId",
//   startAt: 1, //시작
//   increment: 1, // 증가
// });

export { CategorySchema };
