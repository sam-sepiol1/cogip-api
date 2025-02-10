import { DatabaseError, ValidationError } from "../errors/customErrors.js";

export const errorHandler = (err, req, res) => {
    console.error(err);

    if (err instanceof ValidationError) {
        return res.status(422).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: err.message
            }
        });
    }

    if (err instanceof DatabaseError) {
        return res.status(500).json({
            success: false,
            error: {
                code: 'DATABASE_ERROR',
                message: 'A database error occurred'
            }
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'production' 
                ? 'An unexpected error occurred' 
                : err.message
        }
    });
};