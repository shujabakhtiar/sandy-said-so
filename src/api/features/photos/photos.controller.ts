import { NextRequest, NextResponse } from "next/server";
import { PhotosService } from "./photos.service";
import { requireAuth } from "@/api/utils/auth";

export class PhotosController {
  static async create(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const { imageUrl } = await req.json();
      if (!imageUrl) {
        return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
      }
      const photo = await PhotosService.createPhoto({ imageUrl, userId: userId });
      return NextResponse.json(photo, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const photos = await PhotosService.listPhotos(userId);
      return NextResponse.json(photos);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
