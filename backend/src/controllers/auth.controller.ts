import catchAsync from "../utils/catch-async";
import { userService } from "../services";
import authService from "../services/auth.service";
import httpStatus from "http-status";
import logger from "../config/logger";
import { User } from "../@types/user";

const register = catchAsync(async (req, res) => {
    logger.info("🚀 ~ file: auth.controller.ts:7 ~ register ~ req:", req.body);
    const user = await userService.createUser(req.body);
    const otpResponse = await authService.sendOtp(user as User);
    res.status(httpStatus.CREATED).send(otpResponse);
});

const verifyOtp = catchAsync(async (req, res) => {
    logger.info("🚀 ~ file: auth.controller.ts:15 ~ verifyOtp ~ req:", req.body);
    const isVerified = await authService.verifyOtp(req.body);
    if (!isVerified) return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid OTP" });
    const user = userService.getUserByEmail(req.body.email);
    return res.status(httpStatus.ACCEPTED).send({ message: "OTP verified successfully", user: user });
});

const login = catchAsync(async (req, res) => {
    res.send("Login");
});

export default {
    register,
    login,
    verifyOtp
};
