import connexion from "../database-config.js";

export const getAllPermissions = async () => {
    try {
        const [permissions] = await connexion.query('SELECT * FROM permissions');
        return permissions;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deletePermission = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM permissions WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editPermission = async (id, { name }) => {
    try {
        const [result] = await connexion.query(
            `UPDATE permissions 
             SET  name = ?
             WHERE id = ?`,
            [name]
        );

        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createPermission = async ({ name }) => {
    try {
        const [result] = await connexion.query(
            `INSERT INTO permissions (name) 
             VALUES (?, ?, ?, ?`,
            [name]
        );

        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};