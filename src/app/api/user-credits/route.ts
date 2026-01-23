import { UserCreditController } from "@/api/features/user-credits/user-credits.controller";

/**
 * GET /api/user-credits
 */
export async function GET() {
  return UserCreditController.getBalance();
}
