import pkg from 'mongoose';
const { Schema } = pkg;

const CategorySchema = new Schema(
  {
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

export { CategorySchema };
