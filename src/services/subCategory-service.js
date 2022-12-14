import { categoryModel } from "../db/index.js";
import { subCategoryModel } from "../db/index.js";

class SubCategoryService {
  constructor(categoryModel, subCategoryModel) {
    this.categoryModel = categoryModel;
    this.subCategoryModel = subCategoryModel;
  }

  async addSubCategory(categoryName, subCategoryName) {
    const category = await this.categoryModel.findByName(categoryName);

    if (!category) {
      throw new Error("메인 카테고리명이 올바르지 않습니다.");
    }

    const subCategory = await this.subCategoryModel.findBySubCategoryName(
      subCategoryName
    );
    const subcategoryName = subCategoryName;
    const categoryid = category._id;

    if (subCategory) {
      throw new Error(
        `'${subcategoryName}'는(은) 이미 등록된 서브카테고리 입니다.`
      );
    }

    const createdNewSubCategory = await this.subCategoryModel.create(
      categoryid,
      subcategoryName
    );

    return createdNewSubCategory;
  }

  async updateSubCategory(curSubCategoryName, updatedSubCategoryName) {
    const subCategory = await this.subCategoryModel.findBySubCategoryName(
      curSubCategoryName
    );
    if (!subCategory) {
      throw new Error(
        `'${curSubCategoryName}'는(은) 존재하지 않는 서브카테고리 입니다.`
      );
    }

    const filter = { _id: subCategory._id };
    const update = { subCategoryName: updatedSubCategoryName };

    let updatedSubCategory = await this.subCategoryModel.updateSubCategoryName(
      filter,
      update
    );

    updatedSubCategory = await this.subCategoryModel.findBySubCategoryName(
      updatedSubCategoryName
    );

    return updatedSubCategory;
  }
  async deleteSubCategory(subCategoryName) {
    const subcategoryName = subCategoryName.subCategoryName;
    const subCategory = await this.subCategoryModel.findBySubCategoryName(
      subcategoryName
    );

    if (!subCategory) {
      throw new Error(
        `'${subcategoryName}'는(은) 존재하지 않는 서브카테고리 입니다.`
      );
    }

    const deletedSubCategory = await this.subCategoryModel.delete(
      subCategory._id
    );

    return deletedSubCategory;
  }
}

const subCategoryService = new SubCategoryService(
  categoryModel,
  subCategoryModel
);

export { subCategoryService };
