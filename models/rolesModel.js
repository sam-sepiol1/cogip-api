import connexion from '../database-config.js'

export const getRolesByUserId = async (userId) => {
    try {
        const [roles] = await connexion.query(
            `SELECT r.* 
             FROM roles r
             JOIN users u ON u.role_id = r.id
             WHERE u.id = ?`,
            [userId]
        );

        return roles;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateRoles = async (id, { name }) => {
    try {
        const [roles] = await connexion.query('UPDATE roles SET name = ? WHERE id = ?', [name, id]);
        return roles;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createRoles = async ({name}) => {
    try {
        const [result] = await connexion.query(
            'INSERT INTO roles (name) VALUES (?)', [name]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeRole = async (id) => {
    try {
        const [result] = await connexion.query('DELETE FROM roles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(error.message);
    }
};