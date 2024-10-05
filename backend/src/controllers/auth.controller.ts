import catchAsync from "../utils/catch-async";
import { userService } from "../services";

const register = catchAsync(async (req, res) => {
   const user = await userService.createUser(req.body)


});

const login = catchAsync(async (req, res) => {});

export default {
    register,
    login,
};
