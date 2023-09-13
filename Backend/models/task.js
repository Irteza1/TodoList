const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    criteria: {
      type: String,
      enum: ['job', 'home', 'shopping'],
      default: 'job',
    },
  });
  module.exports = mongoose.model('Task', taskSchema);