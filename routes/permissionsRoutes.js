import express from "express";
import { fetchPermissions, removePermission, savePermission, updatePermission } from "../controllers/permissionsController.js";

const router = express.Router();

router.get('/permissions', fetchPermissions);
router.put('/permission/:id', updatePermission);
router.post('/permission', savePermission);
router.delete('/permission/:id', removePermission);

export default router;