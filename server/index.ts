import express, { Request, Response } from "express";
import http from "http";  // Import HTTP module
import { Server } from "socket.io";  // Import Socket.io
import connectDB from "db/database";
import userRoutes from "@routes/User";
import admin from "@routes/Admin";
import cookieParser from "cookie-parser";
import cors from "cors";
import { cloudinaryConnect } from "@config/cloudinary";
import passport from "passport";
import { setupGoogleAuth } from "@controllers/Auth";
import session from "express-session";
import categoryRoutes from "@routes/Category";
import lessonRoutes from "@routes/Lesson";
import courseRoutes from "@routes/Course";
import sectionRoutes from "@routes/Section";
import ChatMessage from "@models/ChatMessage";
import chatRoutes from "@routes/ChatMessage"
import paymentRoutes from "@routes/Payment"
import stripeWebhookRouter from "@config/PaymentHook"
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow frontend to connect
    credentials: true,
  },
});

app.use("/api/stripe-webhook", express.raw({ type: "application/json" }), stripeWebhookRouter);
app.use('/uploads/videos', express.static('uploads/videos'));


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
setupGoogleAuth();

cloudinaryConnect();
connectDB();

app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/lesson", lessonRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", admin);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/chat", chatRoutes)
app.use("/api/v1/" , paymentRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Store online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is online`);
  });

  socket.on("send_message", async ({ senderId, receiverId, message }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${message}`);

    try {
      // Save message to MongoDB
      const newMessage = new ChatMessage({ sender: senderId, receiver: receiverId, message });
      await newMessage.save();

      // Emit to receiver if online
      if (onlineUsers.has(receiverId)) {
        io.to(onlineUsers.get(receiverId)).emit("receive_message", {
          senderId,
          message,
        });
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected:", socket.id);
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
