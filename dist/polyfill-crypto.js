"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
if (typeof globalThis.crypto === 'undefined') {
    globalThis.crypto = {
        randomUUID: uuid_1.v4,
    };
}
//# sourceMappingURL=polyfill-crypto.js.map