import { NextResponse } from "next/server";
import { AuthService } from "./auth.service";
import { SignupSchema, LoginSchema, UpdateUserSchema } from "./auth.types";
import { cookies } from "next/headers";

export class AuthController {
  static async signup(req: Request) {
    try {
      const body = await req.json();
      const validatedData = SignupSchema.parse(body);
      const user = await AuthService.signup(validatedData);
      return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  static async login(req: Request) {
    try {
      const body = await req.json();
      const validatedData = LoginSchema.parse(body);
      const { token, user } = await AuthService.login(validatedData);

      const response = NextResponse.json(user);
      
      // Set HTTP-only cookie
      (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }

  static async logout() {
    const response = NextResponse.json({ message: "Logged out" });
    (await cookies()).delete("token");
    return response;
  }

  static async update(req: Request) {
    try {
      const token = (await cookies()).get("token")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const decoded = AuthService.verifyToken(token);
      if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      const body = await req.json();
      const validatedData = UpdateUserSchema.parse(body);
      const user = await AuthService.update(decoded.userId, validatedData);
      
      return NextResponse.json(user);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  static async me() {
    try {
      const token = (await cookies()).get("token")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const decoded = AuthService.verifyToken(token);
      if (!decoded) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      const user = await AuthService.getUserById(decoded.userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
