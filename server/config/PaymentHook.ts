import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Stripe from "stripe";
import User from "../models/User";
import Course from "../models/Course";

const router = express.Router();
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);


router.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        console.error("Webhook signature verification failed", err);
        res.status(400).json({ error: "Webhook error" });
        return;
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { userId, courseIds } = session.metadata;

        const user = await User.findById(userId);
        const courseIdsArray = JSON.parse(courseIds);

        if (user) {
            user.courses.push(...courseIdsArray);
            await user.save();
        }
    }

    res.json({ received: true });
});

export default router;
