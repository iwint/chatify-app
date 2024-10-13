import catchAsync from "../utils/catch-async";
import { userService } from "../services";
import authService from "../services/auth.service";
import httpStatus from "http-status";
import { User } from "../@types/user";

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const otpResponse = await authService.sendOtp(user as User);
    res.status(httpStatus.CREATED).send(otpResponse);
});

const verifyOtp = catchAsync(async (req, res) => {
    const isVerified = await authService.verifyOtp(req.body);
    if (!isVerified) return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid OTP" });
    const user = await userService.getUserByEmail(req.body.email);
    const token = await authService.generateAuthToken(user?._id);
    return res.status(httpStatus.ACCEPTED).send({ message: "OTP verified successfully", user: user, token: token });
});

const login = catchAsync(async (req, res) => {
    const user = await authService.loginUserWithEmailAndPassword(req.body);
    const otpResponse = await authService.sendOtp(user as User);
    res.status(httpStatus.ACCEPTED).send(otpResponse)
});

export default {
    register,
    login,
    verifyOtp,
};
