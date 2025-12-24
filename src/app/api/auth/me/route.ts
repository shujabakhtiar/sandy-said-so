import { AuthController } from "@/api/features/auth/auth.controller";

export async function GET() {
  return AuthController.me();
}

export async function PATCH(req: Request) {
  return AuthController.update(req);
}
