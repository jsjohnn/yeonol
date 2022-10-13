import { packageModel } from "../db/index.js";

class PackageService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(packageModel) {
    this.packageModel = packageModel;
  }

  // 패키지 생성
  async addPackage(packageInfo) {
    // 객체 destructuring
    const {
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
    } = packageInfo;

    const newPackageInfo = {
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
    };

    // db에 저장
    const createdNewPackage = await this.packageModel.create(newPackageInfo);

    return createdNewPackage;
  }
  // 상품 목록 전체 가져옴
  async getPackages() {
    const packages = await this.packageModel.findAll();
    return packages;
  }
  // 상품 Id로 검색
  async getPackageId(PackageId) {
    const findPackage = await this.packageModel.findById(PackageId);

    return findPackage;
  }

  // 상품 목록 수정
  async setPackage(packageInfoRequired, toUpdate) {
    // 객체 destructuring
    const packageId = packageInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let packages = await this.packageModel.findById(packageId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!packages) {
      throw new Error("상품 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 업데이트 진행
    packages = await this.packageModel.update({
      packageId,
      update: toUpdate,
    });

    return packages;
  }

  async setCount(packageInfoRequired, toUpdate) {
    // 객체 destructuring
    const packageId = packageInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let packages = await this.packageModel.findById(packageId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!packages) {
      throw new Error("상품 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 이제 드디어 업데이트 시작
    const countNumber = toUpdate;

    // 업데이트 진행
    packages = await this.packageModel.update({
      packageId,
      update: toUpdate,
    });

    return packages;
  }

  // 상품 삭제
  async DeletePackage(packagedate) {
    // 객체 destructuring
    const packageId = packagedate;

    // db에 저장
    const deletePackage = await this.packageModel.delete(packageId);

    return deletePackage;
  }

}

const packageService = new PackageService(packageModel);

export { packageService };
