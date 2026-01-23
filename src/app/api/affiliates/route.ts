import { AffiliateController } from "@/api/features/affiliates/affiliates.controller";

/**
 * GET /api/affiliates/validate?code=XYZ
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.has("code")) {
    return AffiliateController.validateCode(req);
  }
  return AffiliateController.getMyEarnings();
}
