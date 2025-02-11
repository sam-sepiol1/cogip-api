import {
    getAllContacts,
    createContact,
    editContact,
    deleteContact,
    getContactByName,
    sortAscContacts,
    sortDescContacts,
    countAllContacts
} from "../models/contactModel.js";
import { NotFoundError, BadRequestError, DatabaseError } from '../errors/customErrors.js';
import {getCompanyByName} from "../models/companyModel.js";

export const fetchContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();

        if (!contacts || contacts.length === 0) {
            throw new NotFoundError('No contacts found');
        }

        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        if (error.name === 'NotFoundError') throw error;
        throw new DatabaseError('Error while fetching contacts');
    }
};

export const countContacts = async (req, res, next) => {
    try {
        const count = await countAllContacts();

        if (count === null) {
            throw new DatabaseError('Failed to count contacts');
        }

        res.status(200).json({
            success: true,
            total: count
        });
    } catch (error) {
        next(error);
    }
};

export const searchContactByName = async (req, res) => {
    try {
        const { name } = req.params;
        const contact = await getContactByName(name);

        if (!contact) {
            return res.status(500).json({message: "No contacts found."});
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getSortedContactsByNameASC = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const contacts = await sortAscContacts(limit, offset);

        if (!contacts || contacts.length === 0) {
            throw new NotFoundError('No contacts found');
        }

        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching sorted contacts');
    }
};

export const getSortedContactsByNameDESC = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        if (!limit || !offset) {
            throw new BadRequestError('Limit and offset are required');
        }

        const contacts = await sortDescContacts(limit, offset);

        if (!contacts || contacts.length === 0) {
            throw new NotFoundError('No contacts found');
        }

        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while fetching sorted contacts');
    }
};

export const removeContact = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new BadRequestError('Contact ID is required');
        }

        const deleted = await deleteContact(id);

        if (!deleted) {
            throw new NotFoundError('Contact not found');
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while deleting contact');
    }
};

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, company_id, email, phone } = req.body;

        if (!id) {
            throw new BadRequestError('Contact ID is required');
        }

        if (!name && !company_id && !email && !phone) {
            throw new BadRequestError('At least one field to update is required');
        }

        const updated = await editContact(id, { name, company_id, email, phone });

        if (!updated) {
            throw new NotFoundError('Contact not found');
        }

        res.status(200).json({
            success: true,
            message: 'Contact updated successfully'
        });
    } catch (error) {
        if (error.name === 'NotFoundError' || error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while updating contact');
    }
};

export const saveContact = async (req, res) => {
    try {
        const { name, company_name, email, phone } = req.body;

        if (!name || !company_name || !email || !phone) {
            throw new BadRequestError('All fields are required');
        }

        const company = await getCompanyByName(company_name);
        const company_id = company[0].id;

        const contactId = await createContact({ name, company_id, email, phone });
        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: { contactId }
        });
    } catch (error) {
        if (error.name === 'BadRequestError') throw error;
        throw new DatabaseError('Error while creating contact');
    }
};

