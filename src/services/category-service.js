import { categoryModel, subCategoryModel } from "../db";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
    this.subCategoryModel = subCategoryModel;
  }

  async addCategory(categoryInfo) {
    // db에 저장
    const createdNewCategory = await this.categoryModel.create(
      categoryInfo.categoryName
    );
    return createdNewCategory;
  }

  // 메인카테고리 - 서브카테고리 객체 배열 생성을 위한 파싱 함수
  async parseAllCategory(allCategory) {
    let categoryIds = [];
    let categories = [];

    for (let i = 0; i < allCategory.length; ++i) {
      categoryIds.push(allCategory[i].categoryId);
    }
    
    // 메인 카테고리 수 만큼 배열을 순회
    for (let i = 0; i < categoryIds.length; ++i) {
      let subCategoryNames = [];
      const subCategories = await this.subCategoryModel.findByCategoryIdAll(categoryIds[i]);

      // 메인 카테고리에 해당하는 서브카테고리 수 만큼 배열을 순회하며 서브카테고리명을 배열에 저장
      for (let j = 0; j < subCategories.length; ++j) {
        subCategoryNames.push(subCategories[j].subCategoryName);
      }

      let { categoryName } = await this.categoryModel.findById(categoryIds[i]);

      // { 키: 메인카테고리명, 값: 서브 카테고리 배열} 객체 생성후 배열에 push
      let tmpCategory = {};
      tmpCategory[categoryName] = subCategoryNames;
      categories.push(tmpCategory);
    }

    return categories;
  }

  async getAllCategory() {
    const allCategory = await this.categoryModel.findAll({});
    const categories = await this.parseAllCategory(allCategory);
    
    return categories;
  }
}

const categoryService = new CategoryService(categoryModel, subCategoryModel);

export { categoryService };
