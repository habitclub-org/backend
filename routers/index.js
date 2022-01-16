import express from "express";
import userRouter from "./userRouter";
import groupRouter from "./groupRouter";
import missionRouter from "./missionRouter"

const router = express.Router();

router.use("/ping", (req, res) => {
  console.log('pong')
  return (res.status(200).json({ message: 'pong' }
))})

router.use("/users", userRouter);
router.use("/groups", groupRouter);
router.use("/missions", missionRouter)

export default router;
