import catchAsync from "../utils/catch-async";
import { userService } from "../services";
import authService from "../services/auth.service";
import httpStatus from "http-status";
import logger from "../config/logger";

const register = catchAsync(async (req, res) => {
    logger.info("🚀 ~ file: auth.controller.ts:7 ~ register ~ req:", req.body);
    const user = await userService.createUser(req.body);
    const otpResponse = await authService.sendOtp(user);
    res.status(httpStatus.CREATED).send(otpResponse);
});

const login = catchAsync(async (req, res) => {
    res.send("Login");
});

export default {
    register,
    login,
};
