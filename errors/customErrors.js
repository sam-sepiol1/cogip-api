class BaseError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends BaseError {
    constructor(message = 'Validation Error') {
        super(message, 422, 'VALIDATION_ERROR');
    }
}

export class AuthenticationError extends BaseError {
    constructor(message = 'Authentication Failed') {
        super(message, 401, 'AUTHENTICATION_ERROR');
    }
}

export class AuthorizationError extends BaseError {
    constructor(message = 'Not Authorized') {
        super(message, 403, 'AUTHORIZATION_ERROR');
    }
}

export class NotFoundError extends BaseError {
    constructor(message = 'Resource Not Found') {
        super(message, 404, 'NOT_FOUND_ERROR');
    }
}

export class DatabaseError extends BaseError {
    constructor(message = 'Database Error') {
        super(message, 500, 'DATABASE_ERROR');
    }
}

export class ConflictError extends BaseError {
    constructor(message = 'Resource Conflict') {
        super(message, 409, 'CONFLICT_ERROR');
    }
}

export class BadRequestError extends BaseError {
    constructor(message = 'Bad Request') {
        super(message, 400, 'BAD_REQUEST_ERROR');
    }
} 