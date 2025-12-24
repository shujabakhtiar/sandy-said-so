import { Router } from "express";
import { PhotosController } from "./photos.controller";

const router = Router();

router.post("/", PhotosController.create);
router.get("/", PhotosController.list);

export default router;
