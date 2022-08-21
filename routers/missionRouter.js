import express from "express";
import completeRouter from './completeRouter'
import { missionController } from "../controllers";

const router = express.Router();

router.get("", missionController.getMissions);
router.get("/statistics", missionController.getMissionStatistics);
router.get("/histories", missionController.getMissionCompleteness);
router.use("/:missionId/completes", completeRouter);

export default router;
