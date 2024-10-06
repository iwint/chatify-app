import jwt from "jsonwebtoken";
import envConfig from "../config/env";
import { OTP, Token } from "../models";
import { ObjectId } from "mongoose";
import { SendEmailParams, User } from "../@types/user";
import nodemailer from "nodemailer";
import env from "../config/env";
import ApiError from "../utils/api-error";
import httpStatus from "http-status";
import logger from "../config/logger";
import otpGenerator from "otp-generator";

const generateAuthToken = async (userId: ObjectId) => {
    const token = jwt.sign({ sub: userId }, envConfig.jwt.secret);
    return await Token.create({
        token: token,
        user: userId,
    });
};

const sendVerificationEmail = async ({ email, otp }: SendEmailParams) => {
    try {
        const subject = "OTP Verfication from RED's Chatify";
        const body = otp;
        const mailTransporter = nodemailer.createTransport({
            host: env.email.smtp.host,
            auth: env.email.smtp.auth,
            service: "gmail",
        });
        const response = await mailTransporter.sendMail({
            from: {
                address: env.email.from,
                name: "Chatify",
            },
            to: email,
            subject: subject,
            html: body,
        });
        logger.info("🚀 ~ file: auth.service.ts:33 ~ sendVerificationEmail ~ response:", response);
        return response;
    } catch (err: any) {
        logger.error("🚀 ~ file: auth.service.ts:42 ~ sendVerificationEmail ~ err:", err)
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err);
    }
};

const sendOtp = async (user: User) => {
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid email");
    }
    const isOTPSent = saveOtp(user.email);
    if (!isOTPSent) return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "OTP failed. Please try again");
    return {
        message: `OTP sent to ${user.email}`,
        user: user,
    };
};

const saveOtp = async (email: string) => {
    const otp = await otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
    });
    const response = await OTP.create({
        email: email,
        otp: otp,
    });
};

const verifyOtp = async (email: string) => {
    const otp = "";
};

export default {
    sendVerificationEmail,
    generateAuthToken,
    sendOtp,
};
