import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.get("/google", authController.authenticateWithGoogle);

export default router;
