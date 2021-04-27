import {AppError} from "./error";

export class UserTerminatedError implements AppError {
    message: string = 'UserTerminatedError'
    name: string = 'UserTerminatedError'
}
