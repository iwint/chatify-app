import mongoose from "mongoose";

export interface TokenModelType {
    user: mongoose.Schema.Types.ObjectId;
    token: string;
}
