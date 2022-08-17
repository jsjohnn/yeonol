import { Schema } from "mongoose";
import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const CategorySchema = new Schema(
  {
    // categoryId는 auto increment로 작성
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

CategorySchema.plugin(autoIncrement.plugin, {
  model: "Category",
  field: "categoryId",
  startAt: 1, //시작
  increment: 1, // 증가
});

export { CategorySchema };
