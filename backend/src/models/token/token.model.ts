import mongoose from "mongoose";
import { TokenModelType } from "./token";

const tokenSchema = new mongoose.Schema<TokenModelType>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
        index: true,
    },
});

const Token = mongoose.model("Token", tokenSchema);
