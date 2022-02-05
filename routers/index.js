import express from "express";
import userRouter from "./userRouter";
import groupRouter from "./groupRouter";
import missionRouter from "./missionRouter"
import validateToken from "../middlewares/validateToken";

const router = express.Router();

router.use("/ping", (req, res) => {
  console.log('pong')
  return (res.status(200).json({ message: 'pong' }
))})

router.use("/users", userRouter);
router.use("/groups", validateToken, groupRouter);
router.use("/missions", validateToken, missionRouter)

export default router;
