import { NextRequest } from "next/server";
import { PeopleController } from "@/api/features/people/people.controller";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return PeopleController.update(req, { params });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return PeopleController.delete(req, { params });
}
