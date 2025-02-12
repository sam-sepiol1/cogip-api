import { getAllPermissions, createPermission, editPermission, deletePermission } from "../models/permissionModel.js";
import { NotFoundError, BadRequestError, DatabaseError } from '../errors/customErrors.js';

export const fetchPermissions = async (req, res) => {
    try {
        const permissions = await getAllPermissions();

        if (!permissions || permissions.length === 0) {
            throw new NotFoundError('No permissions found');
        }

        res.status(200).json({
            success: true,
            data: permissions
        });
    } catch (error) {
        if (error.name === 'NotFoundError') throw error;
        throw new DatabaseError('Error while fetching permissions');
    }
};

export const removePermission = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Permission ID is required');
        }

        const deleted = await deletePermission(id);

        if (!deleted) {
            throw new NotFoundError('Permission not found');
        }

        res.status(200).json({
            success: true,
            message: 'Permission deleted successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while deleting permission');
    }
};

export const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id) {
            throw new BadRequestError('Permission ID is required');
        }

        if (!name) {
            throw new BadRequestError('Permission name is required');
        }

        const updated = await editPermission(id, { name });

        if (!updated) {
            throw new NotFoundError('Permission not found');
        }

        res.status(200).json({
            success: true,
            message: 'Permission updated successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while updating permission');
    }
};

export const savePermission = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new BadRequestError('Permission name is required');
        }

        const permissionId = await createPermission({ name });

        res.status(201).json({
            success: true,
            message: 'Permission created successfully',
            data: { permissionId }
        });
    } catch (error) {
        if (error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while creating permission');
    }
};