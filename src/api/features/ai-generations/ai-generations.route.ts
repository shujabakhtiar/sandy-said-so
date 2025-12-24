import { Router } from "express";
import { AIGenerationsController } from "./ai-generations.controller";

const router = Router();

router.post("/", AIGenerationsController.create);

export default router;
