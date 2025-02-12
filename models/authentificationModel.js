import Bcrypt from "bcrypt";
import connexion from "../database-config.js";

export const register = async (first_name, last_name, role_id, email, password) => {
    try {
        const userExists = await checkIfUserAlreadyExists(email);
        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await Bcrypt.hash(password, 8);

        const [createdUser] = await connexion.query('INSERT INTO users (first_name, last_name, role_id, email, password) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, role_id, email, hashedPassword]);

        const [user] = await connexion.query('SELECT * FROM users WHERE id=?', [createdUser.insertId]);

        return user[0];
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error.message);
        throw new Error(error.message);
    }
};

export const login = async (email, password) => {
    try {
        const user = await checkIfUserAlreadyExists(email);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await Bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        return user;
    } catch (error) {
        console.error("Login error:", error.message);
        return null;
    }
};

const checkIfUserAlreadyExists = async (email) => {
    console.log('check if user exists')
    const [result] = await connexion.query('SELECT * FROM users WHERE email = ?', [email]);

    return result.length > 0 ? result[0] : null;
};
