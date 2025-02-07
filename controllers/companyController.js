import {
    getAllCompanies,
    removeCompany,
    updateCompany,
    createCompany,
    getCompanyById,
    getCompanyByName,
    getAscSortedCompanies,
    getDescSortedCompanies,
    countAllCompanies
} from "../models/companyModel.js";
import { NotFoundError, BadRequestError, DatabaseError } from '../errors/customErrors.js';

export const getCompanies = async (req, res) => {
    try {
        const companies = await getAllCompanies();

        if (!companies || companies.length === 0) {
            throw new NotFoundError('No companies found');
        }

        res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        if (error.name === 'NotFoundError') throw error;
        throw new DatabaseError('Error while fetching companies');
    }
};

export const countCompanies = async (req, res) => {
    try {
        const count = await countAllCompanies();

        if (count === null) {
            throw new DatabaseError('Failed to count companies');
        }

        res.status(200).json({
            success: true,
            total: count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: 'Error while counting companies',
                details: error.message
            }
        });
    }
};

export const searchCompanyById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Company ID is required');
        }

        const company = await getCompanyById(id);

        if (!company) {
            throw new NotFoundError('Company not found');
        }

        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching company');
    }
};

export const searchCompanyByName = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            throw new BadRequestError('Company name is required');
        }

        const company = await getCompanyByName(name);

        if (!company) {
            throw new NotFoundError('Company not found');
        }

        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while searching company');
    }
};

export const getCompaniesSortedByNameASC = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const companies = await getAscSortedCompanies(limit, offset);

        if (!companies || companies.length === 0) {
            throw new NotFoundError('No companies found');
        }

        res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching sorted companies');
    }
};

export const getCompaniesSortedByNameDESC = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const companies = await getDescSortedCompanies(limit, offset);

        if (!companies || companies.length === 0) {
            throw new NotFoundError('No companies found');
        }

        res.status(200).json({
            success: true,
            data: companies
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching sorted companies');
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Company ID is required');
        }

        const deleted = await removeCompany(id);

        if (!deleted) {
            throw new NotFoundError('Company not found');
        }

        res.status(200).json({
            success: true,
            message: 'Company deleted successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while deleting company');
    }
};

export const updateOneCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type_id, country, tva } = req.body;

        if (!id) {
            throw new BadRequestError('Company ID is required');
        }

        if (!name && !type_id && !country && !tva) {
            throw new BadRequestError('At least one field to update is required');
        }

        const updated = await updateCompany(id, { name, type_id, country, tva });

        if (!updated) {
            throw new NotFoundError('Company not found');
        }

        res.status(200).json({
            success: true,
            message: 'Company updated successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while updating company');
    }
};

export const createOneCompany = async (req, res) => {
    try {
        const { name, type_id, country, tva } = req.body;

        if (!name || !type_id || !country || !tva) {
            throw new BadRequestError('All fields are required');
        }

        const companyId = await createCompany({ name, type_id, country, tva });

        res.status(201).json({
            success: true,
            message: 'Company created successfully',
            data: { companyId }
        });
    } catch (error) {
        if (error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while creating company');
    }
};

