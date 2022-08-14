import express from "express";
import { groupController } from "../controllers";

const router = express.Router();

router.get("", groupController.getGroups);
router.get("/:id", groupController.getGroup);
router.post("", groupController.createGroup);
router.post("/:groupId/members", groupController.addGroupMember);
// router.get("/:groupId/invitationCode", groupController.getGroupInvitationCode) // TODO
router.get("/:groupId/completes", groupController.getGroupMemberCompletes);

export default router;
