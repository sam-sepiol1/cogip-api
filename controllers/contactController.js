import {
    getAllContacts,
    createContact,
    editContact,
    deleteContact,
    getPaginatedContacts, getContactByName, sortAscContacts, sortDescContacts, countAllContacts
} from "../models/contactModel.js";
import {getCompanyByName, getPaginatedCompanies} from "../models/companyModel.js";

export const fetchContacts = async (req, res) => {
    try {
        const contacts = await getAllContacts();

        if (!contacts) {
            return res.status(500).json({ message: "No contacts found." });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const countContacts = async (req, res) => {
    try {
        const count= await countAllContacts();

        if (count === null) {
            return res.status(500).json({ message: "Failed to count contacts." });
        }

        res.status(200).json({ totalContacts: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

        const datas = await sortAscContacts(limit, offset);

        if (!datas.length) {
            return res.status(500).json({message:"No contacts found"});
        }

        res.status(200).json(datas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getSortedContactsByNameDESC = async (req, res) => {
    try {
        const { limit, offset } = req.params;

        const datas = await sortDescContacts(limit, offset);

        if (!datas.length) {
            return res.status(500).json({message:"No contacts found"});
        }

        res.status(200).json(datas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const removeContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await deleteContact(id);

        if (!deleted) {
            return res.status(500).json({ message: "Contact not found." });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, company_id, email, phone } = req.body;

        const updated = await editContact(id, { name, company_id, email, phone });

        if (!updated) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const saveContact = async (req, res) => {
    try {
        const { name, company_id, email, phone } = req.body;

        const contactId = await createContact({ name, company_id, email, phone });

        res.status(201).json({
            message: "Contact created successfully",
            contactId: contactId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

