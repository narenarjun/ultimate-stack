import { CustomError } from "./custom-errror";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connection to database";
  constructor() {
    super('Error connecting to DB');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
