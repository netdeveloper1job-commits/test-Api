import { EventLogResponse } from './event-log.response';
export declare class EventLogWithResponse {
    message: string;
    data?: EventLogResponse | EventLogResponse[];
    constructor(message: string, data: EventLogResponse | EventLogResponse[]);
}
