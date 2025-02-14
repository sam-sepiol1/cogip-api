import express from "express";
import { editUser, getUsers, getUser, removeUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id', editUser);
router.delete('/users/:id', removeUser);

export default router;
