import connexion from '../database-config.js';

export const getInvoices = async () => {
    try {
        const [invoices] = await connexion.query('SELECT * FROM invoices');
        return invoices;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getInvoiceById = async (id) => {
    try {
        const [result] = await connexion.query('SELECT * FROM invoices WHERE id = ?', id);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeInvoice = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM invoices WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateInvoice = async (id, { ref, id_company }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE invoices SET ref = ?, id_company = ? WHERE id = ?`,
            [ref, id_company, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createInvoice = async ({ref, id_company}) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO invoices (ref, id_company)
            VALUES (?, ?)`,
            [ref, id_company]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};

