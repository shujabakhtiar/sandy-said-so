import { AuthController } from "@/api/features/auth/auth.controller";

export async function POST(req: Request) {
  return AuthController.signup(req);
}
