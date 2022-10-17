import { Router } from "express";
import is from "@sindresorhus/is";
import { packageService } from "../services/index.js";
import multer from "multer";

const packageRouter = Router();
const DIR = "src/db/image/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  }, //file 을 받아와서 DIR 경로에 저장한다.
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // 말 그대로 fileFilter
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png .jpg and .jpeg format allowed!"));
    }
  },
});

packageRouter.post(
  "/package",
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      console.log(req.body);
      const url = "http://localhost:5000";
      const packageName = req.body.packageName;
      const category = req.body.category;
      const country = req.body.country;
      const price = req.body.price;
      const days = req.body.days;
      const departureAt = req.body.departureAt;
      const arrivalAt = req.body.arrivalAt;
      const totalNumber = req.body.totalNumber;
      const imgUrl = url + "/db/image/" + req.file.filename;
      const substance = req.body.substance;

      // 위 데이터를 유저 db에 추가하기
      const newPackage = await packageService.addPackage({
        packageName,
        category,
        country,
        price,
        days,
        departureAt,
        arrivalAt,
        totalNumber,
        imgUrl,
        substance,
      });

      res.status(201).json(newPackage);
    } catch (error) {
      next(error);
    }
  }
);

packageRouter.get("/packages", async function (req, res, next) {
  try {
    const packages = await packageService.getPackages();

    res.status(200).json(packages);
  } catch (error) {
    next(error);
  }
});

packageRouter.get("/package/:packageId", async function (req, res, next) {
  try {
    const packageId = req.params.packageId;

    const getId = await packageService.getPackageId(packageId);

    res.status(200).json(getId);
  } catch (error) {
    next(error);
  }
});

packageRouter.patch("/packages/:packageId", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const packageId = req.params.packageId;

    const packageName = req.body.packageName;
    const category = req.body.category;
    const country = req.body.country;
    const price = req.body.price;
    const days = req.body.days;
    const departureAt = req.body.departureAt;
    const arrivalAt = req.body.arrivalAt;
    const totalNumber = req.body.totalNumber;
    const imgUrl = req.body.imgUrl;
    const substance = req.body.substance;

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(packageName && { packageName }),
      ...(category && { category }),
      ...(country && { country }),
      ...(price && { price }),
      ...(days && { days }),
      ...(departureAt && { departureAt }),
      ...(arrivalAt && { arrivalAt }),
      ...(totalNumber && { totalNumber }),
      ...(imgUrl && { imgUrl }),
      ...(substance && { substance }),
    };

    const updatedPackageInfo = await packageService.setPackage(
      packageId,
      toUpdate
    );

    res.status(200).json(updatedPackageInfo);
  } catch (error) {
    next(error);
  }
});

packageRouter.patch(
  "/packagecount/:packageId",
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const packageId = req.params.packageId;

      const countNumber = req.body.countNumber;

      const NumberUpdate = {
        ...(countNumber && { countNumber }),
      };

      const updatedPackageNumber = await packageService.setCount(
        packageId,
        NumberUpdate
      );

      res.status(200).json(updatedPackageNumber);
    } catch (error) {
      next(error);
    }
  }
);

packageRouter.delete("/package/:packageId", async function (req, res, next) {
  try {
    const packageId = req.params.packageId;
    const deletepackage = await packageService.DeletePackage(packageId);
    res.status(200).json(deletepackage);
  } catch (error) {
    next(error);
  }
});


export { packageRouter };
