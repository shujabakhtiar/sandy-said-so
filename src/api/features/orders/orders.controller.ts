import { NextResponse } from "next/server";
import { OrderService } from "./orders.service";
import { CreateOrderSchema } from "./orders.schema";
import { requireAuth } from "@/api/utils/auth";

export class OrderController {
  static async placeOrder(req: Request) {
    try {
      await requireAuth();
      const body = await req.json();
      const validatedData = CreateOrderSchema.parse(body);

      const order = await OrderService.placeOrder(validatedData);

      return NextResponse.json({ 
        success: true, 
        orderId: order.id,
        message: "Order placed successfully." 
    }, { status: 201 });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }
}
