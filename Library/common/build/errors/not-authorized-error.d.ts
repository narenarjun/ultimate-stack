import { CustomError } from "./custom-errror";
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
