import { Schema } from "mongoose";
import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
autoIncrement.initialize(mongoose.connection);

const SubCategorySchema = new Schema(
  {
    categoryId: {
      type: Number,
      required: true,
    },
    subCategoryId: {
      type: Number,
      default: 0,
    },
    subCategoryName: {
      type: String,
      required: true,
    },
  },
  {
    collection: "subcategories",
    versionKey: false,
    timestamps: true,
  }
);

SubCategorySchema.plugin(autoIncrement.plugin, {
  model: "SubCategory",
  field: "subCategoryId",
  startAt: 1, //시작
  increment: 1, // 증가
});

export { SubCategorySchema };
