import { NextRequest } from "next/server";
import { FaceMappingsController } from "@/api/features/face-mappings/face-mappings.controller";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return FaceMappingsController.delete(req, { params: resolvedParams });
}
