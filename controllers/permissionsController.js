import { getAllPermissions, createPermission, editPermission, deletePermission } from "../models/permissionModel.js";

export const fetchPermissions = async (req, res) => {
    try {
        const userPermissions = await getAllPermissions();

        if (!userPermissions) {
            return res.status(500).json({ message: "No permission found." });
        }
        res.status(200).json(userPermissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removePermission = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await deletePermission(id);

        if (!deleted) {
            return res.status(500).json({ message: "Permission not found." });
        }
        res.status(200).json({ message: "Permission deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updated = await editPermission(id, { name });

        if (!updated) {
            return res.status(404).json({ message: "Permission not found" });
        }

        res.status(200).json({ message: "Permission updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const savePermission = async (req, res) => {
    try {
        const { name } = req.body;

        const permissionId = await createPermission({ name });

        res.status(201).json({
            message: "Permission created successfully",
            permissionId: permissionId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};