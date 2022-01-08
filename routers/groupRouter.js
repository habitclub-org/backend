import express from "express";
import { groupController } from "../controllers";

const router = express.Router();

router.get("", groupController.getGroups);
router.get("/missions", groupController.getGroupsWithMissions);

export default router;
