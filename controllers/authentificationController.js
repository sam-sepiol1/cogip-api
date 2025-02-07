import jwt from 'jsonwebtoken';
import { login, register } from "../models/authentificationModel.js";
import { AuthenticationError, BadRequestError, ConflictError, ValidationError } from '../errors/customErrors.js';

export const createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, role_id, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            throw new ValidationError('Missing required fields');
        }

        if (password.length < 6) {
            throw new ValidationError('Password must be at least 6 characters long');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('Invalid email format');
        }

        const user = await register(first_name, last_name, role_id, email, password);

        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7h' });

        return res.status(200).json({
            success: true,
            message: "User successfully created.",
            data: {
                user,
                token
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'ConflictError') {
            next(error);
            return;
        }

        if (error.message === 'User already exists') {
            next(new ConflictError('User with this email already exists'));
            return;
        }

        next(error);
    }
};

export const logUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ValidationError('Email and password are required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('Invalid email format');
        }

        const user = await login(email, password);

        if (!user) {
            throw new AuthenticationError('Invalid email or password');
        }

        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7h' });

        return res.status(200).json({
            success: true,
            data: { token }
        });
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'AuthenticationError') {
            next(error);
            return;
        }

        next(new AuthenticationError('Authentication failed'));
    }
};

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new AuthenticationError('No token provided');
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AuthenticationError('Invalid token'));
            return;
        }
        next(new AuthenticationError('Authentication failed'));
    }
};
