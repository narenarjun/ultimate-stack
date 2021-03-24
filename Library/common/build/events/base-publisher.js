"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
var Publisher = /** @class */ (function () {
    function Publisher(client) {
        this.client = client;
    }
    Publisher.prototype.publish = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.publish(_this.subject, JSON.stringify(data), function (err) {
                if (err) {
                    return reject(err);
                }
                console.log("Event published to subject", _this.subject);
                resolve();
            });
        });
    };
    return Publisher;
}());
exports.Publisher = Publisher;
