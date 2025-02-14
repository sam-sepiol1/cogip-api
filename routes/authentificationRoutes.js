import express from "express";
import { createUser, logUser, checkAuthStatus } from "../controllers/authentificationController.js";

const router = express.Router();

router.post('/auth/register', createUser);
router.post('/auth/login', logUser);
router.get('/auth/check', checkAuthStatus);

export default router;
