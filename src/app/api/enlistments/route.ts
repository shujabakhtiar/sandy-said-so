import { NextRequest, NextResponse } from "next/server";
import { EnlistmentsController } from "@/api/features/enlistments/enlistments.controller";


export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  const response = await EnlistmentsController.create(req);
  return response;
}

export async function GET(req: NextRequest) {
  const response = await EnlistmentsController.list(req);
  return response;
}

