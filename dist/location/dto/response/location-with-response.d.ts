import { LocationResponse } from './location-response';
export declare class LocationWithResponse {
    message: string;
    data?: LocationResponse | LocationResponse[];
    constructor(message: string, data?: LocationResponse | LocationResponse[]);
}
