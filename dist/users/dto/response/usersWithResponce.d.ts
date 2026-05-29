import { UserResponse } from './users-response';
export declare class UserWithResponse {
    message: string;
    data?: UserResponse | UserResponse[];
    constructor(message: string, data?: UserResponse | UserResponse[]);
}
