import { getInvoices, removeInvoice, updateInvoice, createInvoice, getInvoiceById } from '../models/invoiceModel.js'

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await getInvoices();

        if (!invoices) {
            return res.status(500).json({message:"No invoices found"});
        }
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getOneInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await getInvoiceById(id);

        if (!invoice) {
            return res.status(500).json({message:"No invoice found"});
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await removeInvoice(id);

        if (!deleted) {
            return res.status(500).json({message:"No invoice found"});
        }
        res.status(200).json({message:"Successfully deleted invoice"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateOneInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { ref, id_company } = req.body;

        const updated = await updateInvoice(id, {ref, id_company});

        if (!updated) {
            return res.status(500).json({message:"No invoice found"});
        }
        res.status(200).json({message:"Successfully updated invoice"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const createOneInvoice = async (req, res) => {
    try {
        const { ref, id_company } = req.body;

        const invoice = await createInvoice({ ref, id_company });

        res.status(201).json({message:"Successfully created invoice"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};