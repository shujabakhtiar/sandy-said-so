import { NextRequest, NextResponse } from "next/server";
import { FaceMappingsService } from "./face-mappings.service";

export class FaceMappingsController {
  static async create(req: NextRequest) {
    try {
      const { faceId, personId } = await req.json();
      if (!faceId || !personId) {
        return NextResponse.json({ error: "faceId and personId are required" }, { status: 400 });
      }
      const mapping = await FaceMappingsService.mapFaceToPerson({ 
        faceId: Number(faceId), 
        personId: Number(personId) 
      });
      return NextResponse.json(mapping, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async delete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      await FaceMappingsService.removeMapping(Number(id));
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
