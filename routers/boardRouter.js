import express from "express";
import { boardController } from "../controllers";

const router = express.Router();

router.get("", boardController.getBoards);

export default router;
