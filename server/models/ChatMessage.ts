import mongoose, { Schema, Document } from "mongoose";

export interface IChatMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
}

const ChatMessageSchema: Schema = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const ChatMessage = mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);

export default ChatMessage;
