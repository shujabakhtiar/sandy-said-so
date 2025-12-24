import { Router } from "express";
import { GameDecksController } from "./game-decks.controller";

const router = Router();

router.post("/", GameDecksController.create);
router.get("/", GameDecksController.list);
router.patch("/:id/save", GameDecksController.save);

export default router;
