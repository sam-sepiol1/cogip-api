import { createRoles, getRolesByUserId, removeRole, updateRoles } from '../models/rolesModel.js'
import { NotFoundError, BadRequestError, DatabaseError } from '../errors/customErrors.js'

export const getRolesForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            throw new BadRequestError('User ID is required');
        }

        const roles = await getRolesByUserId(userId);

        if (!roles || roles.length === 0) {
            throw new NotFoundError('No roles found for this user');
        }

        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching user roles');
    }
};

export const createRole = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new BadRequestError('Role name is required');
        }

        const roleId = await createRoles({ name });

        res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: { roleId }
        });
    } catch (error) {
        if (error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while creating role');
    }
};

export const updateRole = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Role ID is required');
        }

        if (!name) {
            throw new BadRequestError('Role name is required');
        }

        const updated = await updateRoles(id, { name });

        if (!updated) {
            throw new NotFoundError('Role not found');
        }

        res.status(200).json({
            success: true,
            message: 'Role updated successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while updating role');
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Role ID is required');
        }

        const deleted = await removeRole(id);

        if (!deleted) {
            throw new NotFoundError('Role not found');
        }

        res.status(200).json({
            success: true,
            message: 'Role deleted successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while deleting role');
    }
};