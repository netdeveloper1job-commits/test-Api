"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_event_log_dto_1 = require("./create-event-log.dto");
class UpdateEventLogDto extends (0, swagger_1.PartialType)(create_event_log_dto_1.CreateEventLogDto) {
}
exports.UpdateEventLogDto = UpdateEventLogDto;
//# sourceMappingURL=update-event-log.dto.js.map