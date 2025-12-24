import { Router } from "express";
import peopleRoutes from "./features/people/people.route";
import photosRoutes from "./features/photos/photos.route";
import facesRoutes from "./features/faces/faces.route";
import faceMappingsRoutes from "./features/face-mappings/face-mappings.route";
import gameDecksRoutes from "./features/game-decks/game-decks.route";
import gameCardsRoutes from "./features/game-cards/game-cards.route";
import aiGenerationsRoutes from "./features/ai-generations/ai-generations.route";

const router = Router();

router.use("/people", peopleRoutes);
router.use("/photos", photosRoutes);
router.use("/faces", facesRoutes);
router.use("/face-mappings", faceMappingsRoutes);
router.use("/game-decks", gameDecksRoutes);
router.use("/game-cards", gameCardsRoutes);
router.use("/ai-generations", aiGenerationsRoutes);

export default router;
