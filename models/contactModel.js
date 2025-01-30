import connexion from "../database-config.js";

export const getAllContacts = async () => {
    try {
        const [contact] = await connexion.query('SELECT * FROM contacts');
        return contact;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteContact = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM contacts WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editContact = async (id, { name, company_id, email, phone }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE contacts 
             SET  name = ?, company_id = ?, email = ?, phone = ?
             WHERE id = ?`,
            [name, company_id, email, phone]
        );

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createContact = async ({ name, company_id, email, phone }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO contacts (name, company_id, email, phone) 
             VALUES (?, ?, ?, ?`,
            [name, company_id, email, phone]
        );

        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};