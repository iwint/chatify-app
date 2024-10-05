import mongoose from "mongoose";

export type TokenModelType = {
    user: mongoose.Schema.Types.ObjectId;
    token: string;
}
