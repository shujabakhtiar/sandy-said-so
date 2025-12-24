import { Router } from "express";
import { GameCardsController } from "./game-cards.controller";

const router = Router();

router.post("/", GameCardsController.create);
router.get("/", GameCardsController.list);

export default router;
