import { NextRequest, NextResponse } from "next/server";
import { EnlistmentsController } from "@/api/features/enlistments/enlistments.controller";

function corsResponse(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function OPTIONS(req: NextRequest) {
  return corsResponse(new NextResponse(null, { status: 200 }));
}

export async function POST(req: NextRequest) {
  const response = await EnlistmentsController.create(req);
  return corsResponse(response);
}

export async function GET(req: NextRequest) {
  const response = await EnlistmentsController.list(req);
  return corsResponse(response);
}

