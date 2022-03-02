import express from "express";
import { missionController } from "../controllers";

const router = express.Router();

router.get("", missionController.getMissions);
router.get("/statistics", missionController.getMissionStatistics);
router.get("/histories", missionController.getMissionCompleteness)

export default router;
