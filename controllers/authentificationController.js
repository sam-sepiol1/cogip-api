import jwt from 'jsonwebtoken';
import { login, register } from "../models/authentificationModel.js";
import { AuthenticationError, ConflictError, ValidationError } from '../errors/customErrors.js';

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

        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '4h' });

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
            return res.status(401).json({
                success: false,
                error: {
                    code: 'AUTHENTICATION_ERROR',
                    message: 'No token provided',
                    redirect: '/login'
                }
            });
        }

        try {
            req.user = jwt.verify(token, process.env.SECRET_KEY);
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'AUTHENTICATION_ERROR',
                    message: 'Invalid or expired token',
                    redirect: '/login'
                }
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: {
                code: 'AUTHENTICATION_ERROR',
                message: 'Authentication failed',
                redirect: '/login'
            }
        });
    }
};

export const checkAuthStatus = (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                isAuthenticated: false,
                message: "Utilisateur non connecté"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            return res.status(200).json({
                success: true,
                isAuthenticated: true,
                user: {
                    id: decoded.user.id,
                    email: decoded.user.email,
                    first_name: decoded.user.first_name,
                    last_name: decoded.user.last_name,
                    role_id: decoded.user.role_id
                },
                message: "Utilisateur connecté"
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                isAuthenticated: false,
                message: "Token invalide ou expiré"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Erreur serveur lors de la vérification"
        });
    }
};