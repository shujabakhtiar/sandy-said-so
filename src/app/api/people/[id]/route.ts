import { NextRequest } from "next/server";
import { PeopleController } from "@/api/features/people/people.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return PeopleController.update(req, { params: resolvedParams });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return PeopleController.delete(req, { params: resolvedParams });
}
