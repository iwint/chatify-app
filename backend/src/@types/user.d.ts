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

export type UserResponse = {
    user: UserModelType & Omit<UserModelType, "isPasswordMatch">;
    token: TokenModelType
};
