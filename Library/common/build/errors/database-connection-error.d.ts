import { CustomError } from "./custom-errror";
export declare class DatabaseConnectionError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
