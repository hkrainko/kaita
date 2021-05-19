export class UnAuthError implements AppError {
    message: string = 'UnAuthError'
    name: string = 'UnAuthError'
}

export class RegisterError implements AppError {
    message: string = 'RegisterError'
    name: string = 'RegisterError'
}

export class NotFoundError implements AppError {
    message: string = 'NotFoundError'
    name: string = 'NotFoundError'
}

export class UnknownError implements AppError {
    message: string = 'UnknownError'
    name: string = 'UnknownError'
}

export interface AppError extends Error {
}
