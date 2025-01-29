import express from "express";
import { createUser, logUser } from "../controllers/authentificationController.js";

const router = express.Router();

router.post('/auth/register', createUser);
router.post('/auth/login', logUser);

export default router;
