import {
    getInvoices,
    removeInvoice,
    updateInvoice,
    createInvoice,
    getInvoiceById,
    getPaginatedInvoices,
    sortedAscByDueDateInvoices,
    sortedDescByDueDateInvoices,
    countAllInvoices
} from '../models/invoiceModel.js';
import { NotFoundError, BadRequestError, DatabaseError } from '../errors/customErrors.js';

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await getInvoices();

        if (!invoices || invoices.length === 0) {
            throw new NotFoundError('No invoices found');
        }

        res.status(200).json({
            success: true,
            data: invoices
        });
    } catch (error) {
        if (error.name === 'NotFoundError') throw error;
        throw new DatabaseError('Error while fetching invoices');
    }
};

export const countInvoices = async (req, res) => {
    try {
        const count = await countAllInvoices();

        if (count === null) {
            throw new DatabaseError('Failed to count invoices');
        }

        res.status(200).json({
            success: true,
            total: count
        });
    } catch (error) {
        throw new DatabaseError('Error while counting invoices');
    }
};

export const getOneInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Invoice ID is required');
        }

        const invoice = await getInvoiceById(id);

        if (!invoice) {
            throw new NotFoundError('Invoice not found');
        }

        res.status(200).json({
            success: true,
            data: invoice
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching invoice');
    }
};

export const getPaginatedSortedInvoices = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const invoices = await getPaginatedInvoices(limit, offset);

        if (!invoices || invoices.length === 0) {
            throw new NotFoundError('No invoices found');
        }

        res.status(200).json({
            success: true,
            data: invoices
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching paginated invoices');
    }
};

export const sortAscDueDateInvoices = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const invoices = await sortedAscByDueDateInvoices(limit, offset);

        if (!invoices || invoices.length === 0) {
            throw new NotFoundError('No invoices found');
        }

        res.status(200).json({
            success: true,
            data: invoices
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching sorted invoices');
    }
};

export const sortDescDueDateInvoices = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const invoices = await sortedDescByDueDateInvoices(limit, offset);

        if (!invoices || invoices.length === 0) {
            throw new NotFoundError('No invoices found');
        }

        res.status(200).json({
            success: true,
            data: invoices
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching sorted invoices');
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Invoice ID is required');
        }

        const deleted = await removeInvoice(id);

        if (!deleted) {
            throw new NotFoundError('Invoice not found');
        }

        res.status(200).json({
            success: true,
            message: 'Invoice deleted successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while deleting invoice');
    }
};

export const updateOneInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { ref, id_company } = req.body;

        if (!id) {
            throw new BadRequestError('Invoice ID is required');
        }

        if (!ref && !id_company) {
            throw new BadRequestError('At least one field to update is required');
        }

        const updated = await updateInvoice(id, { ref, id_company });

        if (!updated) {
            throw new NotFoundError('Invoice not found');
        }

        res.status(200).json({
            success: true,
            message: 'Invoice updated successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while updating invoice');
    }
};

export const createOneInvoice = async (req, res) => {
    try {
        const { ref, id_company } = req.body;

        if (!ref || !id_company) {
            throw new BadRequestError('All fields are required');
        }

        const invoiceId = await createInvoice({ ref, id_company });

        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            data: { invoiceId }
        });
    } catch (error) {
        if (error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while creating invoice');
    }
};
