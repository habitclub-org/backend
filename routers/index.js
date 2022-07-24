import express from "express";
import userRouter from "./userRouter";
import groupRouter from "./groupRouter";
import missionRouter from "./missionRouter"
import tagRouter from "./tagRouter"
import boardRouter from './boardRouter'

import validateToken from "../middlewares/validateToken";

const router = express.Router();

router.use("/ping", (req, res) => {
  console.log('pong')
  const time = new Date()
  return (res.status(200).json({ message: 'pong', serverTime: time.toUTCString() }
))})

router.use("/users", userRouter);
router.use("/groups", validateToken, groupRouter);
router.use("/missions", validateToken, missionRouter)
router.use("/tags", validateToken, tagRouter)
router.use("/boards", validateToken, boardRouter)

export default router;
