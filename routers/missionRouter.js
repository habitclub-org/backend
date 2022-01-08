import express from "express";
import { missionController } from "../controllers";

const router = express.Router();

router.get("", missionController.getMissions);

export default router;
