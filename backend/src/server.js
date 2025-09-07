import express from 'express';
import taskRoute from './routes/taskRoute.js';

const app = express();

app.use('/api/tasks', taskRoute);

app.listen(5001, () => {
  console.log("App running on port", 5001);
})
