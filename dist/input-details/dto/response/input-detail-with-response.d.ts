import { InputDetailResponse } from './input-detail-response';
export declare class InputDetailWithResponse {
    message: string;
    data?: InputDetailResponse | InputDetailResponse[];
    constructor(message: string, data?: InputDetailResponse | InputDetailResponse[]);
}
