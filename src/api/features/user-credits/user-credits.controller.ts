import { NextResponse } from "next/server";
import { UserCreditService } from "./user-credits.service";
import { getAuthUser } from "@/api/utils/auth";

export class UserCreditController {
  static async getBalance() {
    try {
      const user = await getAuthUser();
      if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

      const balance = await UserCreditService.getBalance(user.id);

      return NextResponse.json({ success: true, balance });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }
}
