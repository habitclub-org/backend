import express from "express";
import { tagController } from "../controllers";

const router = express.Router();

router.get("", tagController.getUserInterests);

export default router;
