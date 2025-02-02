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

export const getPaginatedInvoices = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT i.ref,i.due_date, i.created_at, c.name as company
                                                FROM invoices AS i 
                                                JOIN companies AS c ON i.id_company = c.id
                                                ORDER BY i.created_at ASC 
                                                LIMIT ${parsedLimit} OFFSET ${parsedOffset}`);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const sortedAscByDueDateInvoices = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT i.ref,i.due_date, i.created_at, c.name as company
                                                FROM invoices AS i 
                                                JOIN companies AS c ON i.id_company = c.id
                                                ORDER BY i.due_date ASC 
                                                LIMIT ${parsedLimit} OFFSET ${parsedOffset}`);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const sortedDescByDueDateInvoices = async (limit, offset) => {
    try {
        const parsedLimit = parseInt(limit, 10);
        const parsedOffset = parseInt(offset, 10);

        const [result] = await connexion.query(`SELECT i.ref,i.due_date, i.created_at, c.name as company
                                                FROM invoices AS i 
                                                JOIN companies AS c ON i.id_company = c.id
                                                ORDER BY i.due_date DESC 
                                                LIMIT ${parsedLimit} OFFSET ${parsedOffset}`);
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

export const createInvoice = async ({ ref, id_company }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO invoices (ref, id_company, due_date)
             VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 YEAR))`,
            [ref, id_company]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};

