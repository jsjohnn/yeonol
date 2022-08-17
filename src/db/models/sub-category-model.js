import { model } from "mongoose";
import { SubCategorySchema } from "../schemas/sub-category-schema";

const SubCategory = model("subcategories", SubCategorySchema);

export class SubCategoryModel {
  async findBySubCategoryId(subCategoryId) {
    const subCategory = await SubCategory.findOne({
      subCategoryId: subCategoryId,
    });

    return subCategory;
  }

  async findByCategoryId(categoryId) {
    const subCategory = await SubCategory.findOne({ categoryId });

    return subCategory;
  }

  async findByCategoryIdAll(categoryId) {
    const subCategory = await SubCategory.find({ categoryId });

    return subCategory;
  }

  async findBySubCategoryName(subCategoryName) {  
    const subCategory = await SubCategory.findOne({ subCategoryName:  subCategoryName});

    return subCategory;
  }

  async findAll() {
    const subCategories = await SubCategory.find({});

    return subCategories;
  }

  async create(categoryId, subCategoryName) {
    const createdNewSubCategory = await SubCategory.create({
      categoryId,
      subCategoryName,
    });

    return createdNewSubCategory;
  }

  async updateSubCategoryName(filter, update) {
    const updatedSubCategory = await SubCategory.findOneAndUpdate(
      filter,
      update
    );

    return updatedSubCategory;
  }

  async delete(subCategoryId) {
    const deletedSubCategory = await SubCategory.findOneAndDelete({
      subCategoryId: subCategoryId,
    });

    return deletedSubCategory;
  }
}

const subCategoryModel = new SubCategoryModel();

export { subCategoryModel };
