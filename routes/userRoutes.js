import express from "express";
import { editUser, getUsers, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/users', getUsers);
router.patch('/users/:id', editUser);
router.delete('/users/:id', removeUser);

export default router;
