import express, { Request, Response } from 'express';
import connectDB from 'db/database';
import userRoutes from '@routes/User';
import admin from '@routes/Admin';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cloudinaryConnect from '@config/cloudinary'
// import fileUpload from 'express-fileupload';
import passport from 'passport';
import { setupGoogleAuth } from '@controllers/Auth';
import session from "express-session";
import categoryRoutes from '@routes/Category';
import lessonRoutes from '@routes/Lesson';
import courseRoutes from '@routes/Course';
import sectionRoutes from '@routes/Section';




const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use("/uploads/videos", express.static("uploads/videos")); // Serve videos
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
)

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp"
//   })
// )

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Add these lines after your existing middleware setup
app.use(passport.initialize());
setupGoogleAuth();

cloudinaryConnect();

connectDB();



app.use('/api/v1/section', sectionRoutes);
app.use('/api/v1/lesson', lessonRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', admin);``
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/category', categoryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});