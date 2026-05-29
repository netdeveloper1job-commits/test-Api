"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformToBoolean = void 0;
const class_transformer_1 = require("class-transformer");
const TransformToBoolean = (propertyKey) => {
    return (0, class_transformer_1.Transform)(({ obj, key }) => {
        const value = obj[propertyKey ?? key];
        if (typeof value === 'string') {
            if (value.toLowerCase() === 'true') {
                return true;
            }
            if (value.toLowerCase() === 'false') {
                return false;
            }
        }
        return value;
    }, { toClassOnly: true });
};
exports.TransformToBoolean = TransformToBoolean;
//# sourceMappingURL=transformToBoolean.js.map