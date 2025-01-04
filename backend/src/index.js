import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {connectDB} from './lib/db.js';

import messageRoute from './routes/message.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});