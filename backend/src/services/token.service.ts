import jwt from "jsonwebtoken";
import envConfig from "../config/env";
import { Token } from "../models";
import { ObjectId } from "mongoose";

const generateAuthToken = async (userId: ObjectId) => {
    const token = jwt.sign({ sub: userId }, envConfig.jwt.secret);
    return await Token.create({
        token: token,
        user: userId,
    });
};

export default {
    generateAuthToken,
};
