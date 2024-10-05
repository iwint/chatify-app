import catchAsync from "../utils/catch-async";
import { userService } from "../services";
import authService from "../services/auth.service";

const register = catchAsync(async (req, res) => {
   const user = await userService.createUser(req.body)
   const isOtpSent = await authService.sendOtp(user.email)


});

const login = catchAsync(async (req, res) => {});

export default {
    register,
    login,
};
