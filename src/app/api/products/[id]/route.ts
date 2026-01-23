import { ProductController } from "@/api/features/products/products.controller";

/**
 * PATCH /api/products/[id]
 */
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return ProductController.updateProduct(req, { params });
}
