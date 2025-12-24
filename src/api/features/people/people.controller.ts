import { NextRequest, NextResponse } from "next/server";
import { PeopleService } from "./people.service";
import { requireAuth } from "@/api/utils/auth";

export class PeopleController {
  static async create(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const { name, note } = await req.json();
      if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
      }
      const person = await PeopleService.createPerson({ name, note, userId: userId });
      return NextResponse.json(person, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const people = await PeopleService.listPeople(userId);
      return NextResponse.json(people);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async update(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const { name, note } = await req.json();
      const person = await PeopleService.updatePerson(Number(id), { name, note });
      return NextResponse.json(person);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async delete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      await PeopleService.deletePerson(Number(id));
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
