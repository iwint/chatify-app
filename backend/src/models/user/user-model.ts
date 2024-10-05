import mongoose, { ObjectId } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { UserModelStatics, UserModelType } from "./user.model";

const userSchema = new mongoose.Schema<UserModelType>(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    return new Error("Invalid email");
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value: string) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    return new Error("Password must contain atleast one letter and one number");
                }
            },
        },
        image_url: {
            type: String,
            trim: true,
        },
        about: {
            type: String,
            trim: true,
            default: "Hi I am using Chatify",
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
            minlength: 10,
            validate(value: number) {
                if (!validator.isMobilePhone(value.toString(), "en-IN")) {
                    return new Error("Invalid phone number");
                }
            },
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updater_at",
        },
        _id: false,
    }
);

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId: ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user; //if user is found return true else false
};

userSchema.methods.isPasswordMatch = async function (password: string) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model<UserModelType, UserModelStatics>("User", userSchema);

export default User;
