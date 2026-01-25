import { NextRequest, NextResponse } from "next/server";
import { EnlistmentsService } from "./enlistments.service";

export class EnlistmentsController {
  static async create(req: NextRequest) {
    try {
      const { email, name } = await req.json();

      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }

      // Check for valid email format if we want, but schema constraint is loose usually.
      // simple check
      if (!/^\S+@\S+\.\S+$/.test(email)) {
         return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

      const enlistment = await EnlistmentsService.enlist(email, name || null);
      return NextResponse.json(enlistment, { status: 201 });
    } catch (error: any) {
      if (error.code === 'P2002') { // Prisma unique constraint violation
        return NextResponse.json({ error: "Email already enlisted" }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const enlistments = await EnlistmentsService.list();
      return NextResponse.json(enlistments);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
