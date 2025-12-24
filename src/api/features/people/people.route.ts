import { Router } from "express";
import { PeopleController } from "./people.controller";

const router = Router();

router.post("/", PeopleController.create);
router.get("/", PeopleController.list);
router.patch("/:id", PeopleController.update);
router.delete("/:id", PeopleController.delete);

export default router;
