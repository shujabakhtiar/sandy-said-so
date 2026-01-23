import { SubscriptionController } from "@/api/features/subscriptions/subscriptions.controller";

/**
 * GET /api/subscriptions
 */
export async function GET() {
  return SubscriptionController.getCurrentSubscription();
}
