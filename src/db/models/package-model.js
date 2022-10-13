import pkg from 'mongoose';
import { PackageSchema } from "../schemas/package-schema.js";

const { model } = pkg;

const Package = model("package", PackageSchema);

export class PackageModel {
  async findByPackageName(packageName) {
    const PackageName = await Package.findOne({ packageName });
    return PackageName;
  }

  async create(packageInfo) {
    const createdNewPackage = await Package.create(packageInfo);
    return createdNewPackage;
  }

  async findAll() {
    const packages = await Package.find({});
    return packages;
  }
  async findById(packageId) {
    const findpackage = await Package.findOne({ _id: packageId });
    return findpackage;
  }

  async update({ packageId, update }) {
    const filter = { _id: packageId };

    const updatedPackage = await Package.findOneAndUpdate(filter, update);
    return updatedPackage;
  }

  async delete(packageId) {
    const deletepackage = await Package.findByIdAndDelete({ _id: packageId });
    return deletepackage;
  }
}

const packageModel = new PackageModel();

export { packageModel };
