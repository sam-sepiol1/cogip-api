import connexion from "../database-config.js";
import { DatabaseError } from '../errors/customErrors.js';

export const getAllContacts = async () => {
    try {
        const [contact] = await connexion.query('SELECT * FROM contacts');
        return contact;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const countAllContacts = async () => {
    try {
        const [result] = await connexion.query('SELECT COUNT(*) AS total FROM contacts');
        return result[0].total;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const getContactByName = async (name) => {
    try {
        const [result] = await connexion.query('SELECT * FROM contacts WHERE name = ?', [name]);
        return result;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const sortAscContacts = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT c.name, c.phone, c.email, co.name AS company, c.created_at
                                                FROM contacts AS c
                                                JOIN companies AS co ON c.company_id = co.id
                                                ORDER BY c.name ASC
                                                LIMIT ${parsedLimit} OFFSET ${parsedOffset};`);
        return result;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const sortDescContacts = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT c.name, c.phone, c.email, co.name AS company, c.created_at
                                                FROM contacts AS c
                                                JOIN companies AS co ON c.company_id = co.id
                                                ORDER BY c.name DESC
                                                LIMIT ${parsedLimit} OFFSET ${parsedOffset};`);
        return result;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const deleteContact = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM contacts WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const editContact = async (id, { name, company_id, email, phone }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE contacts 
             SET name = COALESCE(?, name),
                 company_id = COALESCE(?, company_id),
                 email = COALESCE(?, email),
                 phone = COALESCE(?, phone)
             WHERE id = ?`,
            [name, company_id, email, phone, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};

export const createContact = async ({ name, company_id, email, phone }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO contacts (name, company_id, email, phone) 
             VALUES (?, ?, ?, ?)`,
            [name, company_id, email, phone]
        );

        return result.insertId;
    } catch (error) {
        throw new DatabaseError(error.message);
    }
};
