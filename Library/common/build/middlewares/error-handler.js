"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var custom_errror_1 = require("../errors/custom-errror");
var errorHandler = function (err, req, res, next) {
    if (err instanceof custom_errror_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.error(err);
    res.status(400).send({
        errors: [{ message: "Something went wrong" }],
    });
};
exports.errorHandler = errorHandler;
