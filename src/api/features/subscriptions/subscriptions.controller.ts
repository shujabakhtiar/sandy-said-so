import { NextResponse } from "next/server";
import { SubscriptionService } from "./subscriptions.service";
import { getAuthUser } from "@/api/utils/auth";

export class SubscriptionController {
  static async getCurrentSubscription() {
    try {
      const user = await getAuthUser();
      if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

      const subscription = await SubscriptionService.getUserSubscription(user.id);

      return NextResponse.json({ 
        success: true, 
        subscription,
        isActive: !!subscription 
      });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }
}
