import connexion from "../database-config.js";
import Bcrypt from "bcrypt";

export const getAllUsers = async () => {
    try {
        const [allUsers] = await connexion.query('SELECT * FROM users');
        return allUsers;
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (id, first_name, last_name, role_id, email, password) => {
    const hashedPassword = await Bcrypt.hash(password, 8);
    const [result] = await connexion.query("UPDATE users SET first_name = ?, last_name = ?, role_id = ?, email = ?, password = ? WHERE id = ?", [ first_name, last_name, role_id, email, hashedPassword, id ]);
    return result;
};

export const deleteUser = async (id) => {
    await connexion.query("DELETE FROM users WHERE id = ?", [ id ]);
};
