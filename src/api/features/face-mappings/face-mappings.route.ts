import { Router } from "express";
import { FaceMappingsController } from "./face-mappings.controller";

const router = Router();

router.post("/", FaceMappingsController.create);
router.delete("/:id", FaceMappingsController.delete);

export default router;
