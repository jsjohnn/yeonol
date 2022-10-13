import pkg from 'mongoose';
const { Schema } = pkg;

const SubCategorySchema = new Schema(
  {
    // subCategoryId: {
    //   type: Number,
    //   default: 0,
    // },
    categoryId: {
      type: String,
      required: true,
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

export { SubCategorySchema };
