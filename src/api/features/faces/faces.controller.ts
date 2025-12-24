import { NextRequest, NextResponse } from "next/server";
import { FacesService } from "./faces.service";

export class FacesController {
  static async create(req: NextRequest) {
    try {
      const { photoId, boundingBox, faceEmbedding } = await req.json();
      if (!photoId || !boundingBox) {
        return NextResponse.json({ error: "photoId and boundingBox are required" }, { status: 400 });
      }
      const face = await FacesService.createFace({ 
        photoId: Number(photoId), 
        boundingBox, 
        faceEmbedding 
      });
      return NextResponse.json(face, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const photoId = searchParams.get("photoId");
      if (!photoId) {
        return NextResponse.json({ error: "photoId is required" }, { status: 400 });
      }
      const faces = await FacesService.listFaces(Number(photoId));
      return NextResponse.json(faces);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
