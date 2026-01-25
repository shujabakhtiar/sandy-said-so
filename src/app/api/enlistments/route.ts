import { NextRequest } from "next/server";
import { EnlistmentsController } from "@/api/features/enlistments/enlistments.controller";

export async function POST(req: NextRequest) {
  return EnlistmentsController.create(req);
}

export async function GET(req: NextRequest) {
  return EnlistmentsController.list(req);
}
