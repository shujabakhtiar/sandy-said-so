import { OrderController } from "@/api/features/orders/orders.controller";

/**
 * POST /api/orders
 */
export async function POST(req: Request) {
  return OrderController.placeOrder(req);
}
