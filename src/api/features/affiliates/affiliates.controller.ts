import { NextResponse } from "next/server";
import { AffiliateService } from "./affiliates.service";
import { ValidateAffiliateSchema } from "./affiliates.schema";
import { getAuthUser } from "@/api/utils/auth";

export class AffiliateController {
  static async validateCode(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const code = searchParams.get("code");

      if (!code) {
        return NextResponse.json({ success: false, message: "Code is required" }, { status: 400 });
      }

      const affiliate = await AffiliateService.validateCode(code);

      if (!affiliate) {
        return NextResponse.json({ success: false, message: "Invalid affiliate code" }, { status: 404 });
      }

      return NextResponse.json({ success: true, valid: true });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }

  static async getMyEarnings() {
    try {
      const user = await getAuthUser();
      if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

      const earnings = await AffiliateService.getEarnings(user.id);

      return NextResponse.json({ success: true, earnings });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }
}
