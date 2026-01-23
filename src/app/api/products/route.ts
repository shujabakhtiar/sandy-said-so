import { ProductController } from "@/api/features/products/products.controller";

/**
 * GET /api/products
 */
export async function GET() {
  return ProductController.getAllProducts();
}

/**
 * POST /api/products
 */
export async function POST(req: Request) {
  return ProductController.createProduct(req);
}
