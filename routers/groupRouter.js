import express from "express";
import { groupController } from "../controllers";

const router = express.Router();

router.get("", groupController.getGroups);
router.post("", groupController.createGroup);
router.post("/:groupId/members", groupController.addGroupMember);

export default router;
