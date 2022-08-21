import express from "express";
import { completeController } from "../controllers";

const router = express.Router({ mergeParams: true });

router.post("", completeController.createMissionComplete);

export default router;
