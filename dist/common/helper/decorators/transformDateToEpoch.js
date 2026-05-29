"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformDateToEpoch = void 0;
const class_transformer_1 = require("class-transformer");
const TransformDateToEpoch = () => {
    return (0, class_transformer_1.Transform)(({ obj, key }) => {
        if (obj[key]) {
            if (obj[key] instanceof Date) {
                return parseInt((obj[key].getTime() / 1000).toString(), 10);
            }
            return obj[key];
        }
        return undefined;
    }, { toClassOnly: true });
};
exports.TransformDateToEpoch = TransformDateToEpoch;
//# sourceMappingURL=transformDateToEpoch.js.map