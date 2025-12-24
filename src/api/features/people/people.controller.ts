import { Request, Response } from "express";
import { PeopleService } from "./people.service";

export class PeopleController {
  static async create(req: Request, res: Response) {
    try {
      const { name, note, userId } = req.body;
      if (!name || !userId) {
        return res.status(400).json({ error: "Name and userId are required" });
      }
      const person = await PeopleService.createPerson({ name, note, userId: Number(userId) });
      res.status(201).json(person);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const people = await PeopleService.listPeople(Number(userId));
      res.json(people);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, note } = req.body;
      const person = await PeopleService.updatePerson(Number(id), { name, note });
      res.json(person);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await PeopleService.deletePerson(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
