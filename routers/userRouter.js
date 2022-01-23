import express from "express";
import { userController } from "../controllers";

const router = express.Router();

router.post("/kakao", userController.kakaoLogin);
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

export default router;
