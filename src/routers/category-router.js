import { Router } from "express";
import is from "@sindresorhus/is";
import { categoryService } from "../services";
import { errorHandler } from "../middlewares";


const categoryRouter = Router();

categoryRouter.post("/category", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const categoryName = req.body.categoryName;

    const newCategory = await categoryService.addCategory({
      categoryName,
    });

    res.status(201).json(categoryName);
  } catch (error) {
    next(error);
  }
}, errorHandler);

categoryRouter.get("/category/list", async (req, res, next) => {
  try {
    const allCategory = await categoryService.getAllCategory();

    res.status(201).json(allCategory);
  } catch (error) {
    next(error);
  }
}, errorHandler);

export { categoryRouter };
