import { TokenModelType } from "../models/token/token";
import { UserModelType } from "../models/user/user.model";

export type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
    phone: number;
    about: string;
    image_url: string;
};

export type User = UserModelType & Omit<UserModelType, "isPasswordMatch">;

export type UserResponse = {
    user: User;
    token: TokenModelType;
};

export type SendEmailParams = {
    email: string;
    otp: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};
