import { NextRequest } from "next/server";
import { FaceMappingsController } from "@/api/features/face-mappings/face-mappings.controller";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return FaceMappingsController.delete(req, { params });
}
