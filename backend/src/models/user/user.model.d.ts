import mongoose, { Document, Model, ObjectId } from "mongoose";

export type UserModelType = Document & {
    user_id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: number;
    about: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    isPasswordMatch(password: string): Promise<boolean>;
};

export type UserModelStatics = Model<UserModelType> & {
    isEmailTaken(email: string, excludeUserId?: ObjectId): Promise<boolean>;
}
