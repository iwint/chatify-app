import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/register', authController.authenticateWithGoogle);

export default router;
