import { NextRequest } from "next/server";
import { PeopleController } from "@/api/features/people/people.controller";

export async function POST(req: NextRequest) {
  return PeopleController.create(req);
}

export async function GET(req: NextRequest) {
  return PeopleController.list(req);
}
