export declare class LoginDto {
    username: string;
    password: string;
}
export declare class userModel {
    id: number;
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    userType: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class LoginResponseDto {
    access_token: string;
    user: userModel;
}
