import jwt from 'jsonwebtoken';
import { login, register } from "../models/authentificationModel.js";

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, role_id, email, password } = req.body;

       // TODO avec un vrai pc et une putin de co stable ! await checkMailValidity(email);

        const user = await register(first_name, last_name, role_id, email, password);

        return res.status(200).json({ message: "User successfully created.", data: user });
    } catch (error) {
        res.status(409).json(error.response.data);
    }
};

export const logUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing mandatory fields!' });
        }

        const user = await login(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7h' });

        return res.status(200).json({ token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(403).send('Not authorized');
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        return res.status(403).send({ message: 'Invalid token' });
    }
}
