import { AuthController } from "@/api/features/auth/auth.controller";

export async function POST() {
  return AuthController.logout();
}
