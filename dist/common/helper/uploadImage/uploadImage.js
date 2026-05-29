"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = exports.multerConfig = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
exports.multerConfig = {
    dest: 'upload'
};
function uuidRandom(file) {
    const result = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
    return result;
}
exports.multerOptions = {
    limits: {
        fileSize: 10485760,
    },
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers["content-length"]);
        if ((file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf|csv)$/))) {
            cb(null, true);
        }
        else if (file.mimetype.match(/\/(mpeg|mp4)$/)) {
            cb(null, true);
        }
        else if (file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        }
        else {
            cb(null, false);
            cb(new common_1.HttpException(`Unsupporyted file type ${(0, path_1.extname)(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const myArray = req.path.split("/");
            const dest = myArray[1];
            const uploadPath = `${exports.multerConfig.dest}`;
            if (!(0, fs_1.existsSync)(uploadPath)) {
                (0, fs_1.mkdirSync)(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, uuidRandom(file));
        }
    })
};
//# sourceMappingURL=uploadImage.js.map