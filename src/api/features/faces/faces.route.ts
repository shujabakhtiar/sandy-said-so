import { Router } from "express";
import { FacesController } from "./faces.controller";

const router = Router();

router.post("/", FacesController.create);
router.get("/", FacesController.list);

export default router;
