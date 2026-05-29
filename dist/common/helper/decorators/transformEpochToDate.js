"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformEpochToDate = void 0;
const class_transformer_1 = require("class-transformer");
const TransformEpochToDate = () => {
    return (0, class_transformer_1.Transform)(({ obj, key }) => {
        if (obj[key]) {
            const d = new Date(0);
            d.setUTCSeconds(obj[key]);
            return d;
        }
        return undefined;
    }, { toClassOnly: true });
};
exports.TransformEpochToDate = TransformEpochToDate;
//# sourceMappingURL=transformEpochToDate.js.map