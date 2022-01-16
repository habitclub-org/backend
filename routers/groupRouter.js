import express from "express";
import { groupController } from "../controllers";

const router = express.Router();

router.get("", groupController.getGroups);

export default router;
