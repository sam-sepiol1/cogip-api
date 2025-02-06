import Bcrypt from "bcrypt";
import connexion from "../database-config.js";

export const register = async (first_name, last_name, role_id, email, password) => {
    try {
        const userExists = await checkIfUserAlreadyExists(email);
        console.log('userExists',userExists);
        if (userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await Bcrypt.hash(password, 8);

        const [createdUser] = await connexion.query('INSERT INTO users (first_name, last_name, role_id, email, password) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, role_id, email, hashedPassword]);
        console.log('createduser:',createdUser)
        return createdUser[0];
    } catch (error) {
        console.error("Erreur:", error.message);
        throw new Error(error.message);
    }
};

export const login = async (email, password) => {
    try {
        const userExists = await checkIfUserAlreadyExists(email);
        if (!userExists) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await Bcrypt.compare(password, userExists.password);

        if (isMatch) {
            return userExists;
        } else {
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        throw new Error(error);
    }
};

const checkIfUserAlreadyExists = async (email) => {
    console.log('check if user exists')
    const [result] = await connexion.query('SELECT * FROM users WHERE email = ?', [email]);

    console.log("Result -> ", result);

    if (result.length > 0) {
        return true;
    } else {
        return false;
    }
}
