import { cookies } from "next/headers";
import { AuthService } from "../features/auth/auth.service";
import { NextResponse } from "next/server";

export async function getAuthUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const decoded = AuthService.verifyToken(token);
  if (!decoded) return null;

  return decoded.userId;
}

export async function requireAuth() {
  const userId = await getAuthUser();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}
