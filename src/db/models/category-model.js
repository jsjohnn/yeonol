import pkg from 'mongoose';
const { model } = pkg;
import { CategorySchema } from "../schemas/category-schema.js";

const Category = model("categories", CategorySchema);

export class CategoryModel {
  async findById(categoryId) {
    const category = await Category.findOne({ _id: categoryId });
    return category;
  }

  async findByName(categoryName) {
    const category = await Category.findOne({ categoryName: categoryName });
    return category;
  }

  async create(categoryInfo) {
    const createdNewCategory = await Category.create({ categoryName: categoryInfo });
    return createdNewCategory;
  }

  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async update({ categoryId, update }) {
    const filter = { categoryId: categoryId };
    const option = { returnOriginal: false };

    const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
    return updatedCategory;
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
