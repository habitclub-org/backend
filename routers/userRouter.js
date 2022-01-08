import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.post("/kakao", userController.kakaoLogin);

export default router;
