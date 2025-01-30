import connexion from "../database-config.js";

const getAllCompanies = async () => {
    try {
        const [companies] = await connexion.query('SELECT * FROM companies');
        return companies;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getCompanyById = async (id) => {
    try {
        const [result] = await connexion.query('SELECT * FROM companies WHERE id = ?', [id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

const removeCompany = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM companies WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateCompany = async (id, { name, type_id, country, tva }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE companies 
             SET name = ?, type_id = ?, country = ?, tva = ? 
             WHERE id = ?`,
            [name, type_id, country, tva, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createCompany = async ({ name, type_id, country, tva }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO companies (name, type_id, country, tva) 
             VALUES (?, ?, ?, ?)`,
            [name, type_id, country, tva]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};

export { getAllCompanies, removeCompany, updateCompany, createCompany, getCompanyById };