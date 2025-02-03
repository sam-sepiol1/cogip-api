import jwt from 'jsonwebtoken';
import { login, register } from "../models/authentificationModel.js";

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, role_id, email, password } = req.body;
        await register(first_name, last_name, role_id, email, password);

        res.status(200).json("Utilisateur crée avec succès !");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(500).send('Missing mandatory fields !');
        }

        const user = await login(email, password);

        if (!user) {
            res.status(500).send('Invalid credentials');
        }

        const token = jwt.sign( { user: user }, process.env.SECRET_KEY, { expiresIn: '7h' });
        return res.status(200).json({ message: token });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(500).send('Not authorized');
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}
