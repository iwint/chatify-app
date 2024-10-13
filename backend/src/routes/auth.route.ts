import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify", authController.verifyOtp);

export default router;
