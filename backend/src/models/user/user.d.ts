import mongoose, { Document } from "mongoose";

export interface UserModelType extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: number;
    about: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
}
