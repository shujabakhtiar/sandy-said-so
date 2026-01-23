import { ProductController } from "@/api/features/products/products.controller";

/**
 * PATCH /api/products/[id]
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return ProductController.updateProduct(req, { params });
}
