import express from "express";
import { createRole, deleteRole, getRolesForUser, updateRole } from "../controllers/rolesController.js";


const router = express.Router();

router.get('/roles', getRolesForUser)
router.put('/roles:id', updateRole)
router.post('/roles', createRole)
router.delete('/roles:id', deleteRole)

export default router;