import express from "express";
import { missionController } from "../controllers";

const router = express.Router();

router.get("", missionController.getMissions);
router.get("/statistics", missionController.getMissionStatistics);

export default router;
