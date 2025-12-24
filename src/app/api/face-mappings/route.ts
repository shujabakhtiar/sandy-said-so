import { NextRequest } from "next/server";
import { FaceMappingsController } from "@/api/features/face-mappings/face-mappings.controller";

export async function POST(req: NextRequest) {
  return FaceMappingsController.create(req);
}
