import express from "express";
import { groupController } from "../controllers";

const router = express.Router();

router.get("", groupController.getGroups);
router.post("", groupController.createGroup);

export default router;
