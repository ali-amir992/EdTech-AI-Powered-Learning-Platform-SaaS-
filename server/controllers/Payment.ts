import { Request, Response } from "express";
import { AuthRequest } from "@middlewares/Auth";
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

// Define the expected structure for a cart item
interface CartItem {
    _id: string;
    title: string;
    description: string;
    price: number;
}
export const handlePayment = async (req: Request, res: Response) => {

    try {
        
        const { cartItems }: { cartItems: CartItem[] } = req.body;

        if (!cartItems || cartItems.length === 0) {
            res.status(400).json({ error: "Cart is empty" });
            return;
        }

        const lineItems = cartItems.map((course) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: course.title,
                    description: course.description,
                },
                unit_amount: course.price * 100, // Convert price to cents
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            customer_email: (req as AuthRequest).user?.email as string, // Ensure it's a string
            line_items: lineItems,
            metadata: {
                userId: (req as AuthRequest).user?.id,  
                courseIds: JSON.stringify(cartItems.map((course) => course._id)), // Convert array to string
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session", error);
        res.status(500).json({ error: "Internal server error" });
    }
}