import { NextRequest } from "next/server";
import { FacesController } from "@/api/features/faces/faces.controller";

export async function POST(req: NextRequest) {
  return FacesController.create(req);
}

export async function GET(req: NextRequest) {
  return FacesController.list(req);
}
