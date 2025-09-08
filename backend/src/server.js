import express from 'express';
import taskRoute from './routes/taskRoute.js';
import { connectDB } from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("App running on port", PORT);
  })
});