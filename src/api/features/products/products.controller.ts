import { NextResponse } from "next/server";
import { ProductService } from "./products.service";
import { CreateProductSchema, UpdateProductSchema } from "./products.schema";
import { requireAuth } from "@/api/utils/auth";

export class ProductController {
  static async getAllProducts() {
    try {
      const products = await ProductService.getProducts();
      return NextResponse.json({ success: true, products });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }

  static async createProduct(req: Request) {
    try {
      await requireAuth(); // Basic auth check, maybe add role check later
      const body = await req.json();
      const validatedData = CreateProductSchema.parse(body);

      const product = await ProductService.createProduct(validatedData);

      return NextResponse.json({ success: true, product }, { status: 201 });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }

  static async updateProduct(req: Request, { params }: { params: { id: string } }) {
    try {
      await requireAuth();
      const id = parseInt(params.id);
      if (isNaN(id)) return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });

      const body = await req.json();
      const validatedData = UpdateProductSchema.parse(body);

      const product = await ProductService.updateProduct(id, validatedData);

      return NextResponse.json({ success: true, product });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }
}
