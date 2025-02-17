import express, { Request, Response } from 'express';
import connectDB from './config/database';
const app = express();
require('dotenv').config();

const PORT = process.env.PORT||3000;

app.use(express.json());
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});