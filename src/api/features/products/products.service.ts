import { prisma } from "../../../lib/prisma";
import { CreateProductInput, UpdateProductInput } from "./products.schema";

export class ProductService {
  static async createProduct(data: CreateProductInput) {
    return await prisma.product.create({
      data,
    });
  }

  static async getProducts(onlyActive = true) {
    return await prisma.product.findMany({
      where: onlyActive ? { isActive: true } : {},
      orderBy: { price: "asc" },
    });
  }

  static async getProductById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  static async updateProduct(id: number, data: UpdateProductInput) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  static async deleteProduct(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  }
}
