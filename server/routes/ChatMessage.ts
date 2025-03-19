import { AuthRequest, isAuthenticated } from "@middlewares/Auth";
import ChatMessage from "@models/ChatMessage";
import express from "express";

const router = express.Router();


router.get("/:userId", isAuthenticated, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = (req as AuthRequest).user?.id; // Authenticated user

        const messages = await ChatMessage.find({
            $or: [
                { sender: user, receiver: userId },
                { sender: userId, receiver: user },
            ],
        })
            .sort({ createdAt: 1 }) // Sort oldest to newest
            .lean();

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
