import express, { Request, Response } from 'express';
import connectDB from '@config/database';
import userRoutes from '@routes/userRoutes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cloudinaryConnect from '@config/cloudinary'
import fileUpload from 'express-fileupload';


const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true
  })  
)
app.use(
  fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp"
  })
)
cloudinaryConnect();

connectDB();

app.use('/api/v1/user', userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});