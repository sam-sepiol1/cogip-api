import connexion from "../database-config.js";
import Bcrypt from "bcrypt";

export const register = async (first_name, last_name, role_id, email, password) => {
    try {
        const userExists = await checkIfUserAlreadyExists(email);
        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await Bcrypt.hash(password, 8);
        const [createdUser] = await connexion.query('INSERT INTO users (first_name, last_name, role_id, email, password) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, role_id, email, hashedPassword]);
        return createdUser;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const userExists = await checkIfUserAlreadyExists(email);
        if (userExists) {
            throw new Error('User already exists');
        }
        // TODO JWT !!
        return "Coming soon";
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const checkIfUserAlreadyExists = async (email) => {
    const [user] = await connexion.query('SELECT * FROM users WHERE email = ?', [email]);
    return user.length > 0;
}
