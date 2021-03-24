import { CustomError } from "./custom-errror";
export declare class BadRequestError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
