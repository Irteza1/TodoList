require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const tasksRouter = require('./routes/tasksRoute');
const authRouter = require('./routes/authRoute');
const app = express();
const cors = require('cors');
// Connect to MongoDB using Mongoose
const URL =process.env.MONGO_URL
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())

// API routes
app.use('/tasks', tasksRouter);
app.use('/api', authRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
