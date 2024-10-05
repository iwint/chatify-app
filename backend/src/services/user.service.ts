import httpStatus from "http-status";
import ApiError from "../utils/api-error";
import { CreateUserRequest } from "../@types/user";
import { User } from "../models";

const createUser = async (user: CreateUserRequest) => {
    const isEmailTaken = await User.isEmailTaken(user.email);
    if (isEmailTaken) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email Already exist");
    }
    return User.create(user);
};

export default {
    createUser,
};
