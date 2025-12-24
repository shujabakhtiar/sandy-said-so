import { NextRequest } from "next/server";
import { PhotosController } from "@/api/features/photos/photos.controller";

export async function POST(req: NextRequest) {
  return PhotosController.create(req);
}

export async function GET(req: NextRequest) {
  return PhotosController.list(req);
}
