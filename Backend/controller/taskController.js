// Get all tasks
const Task = require('../models/task');
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.query.userId;

    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate, status, userId, criteria } = req.body;

  const task = new Task({
    title,
    description,
    priority,
    dueDate,
    status,
    userId,
    criteria

  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (req.body.title) {
      task.title = req.body.title;
    }

    if (req.body.description) {
      task.description = req.body.description;
    }

    if (req.body.priority) {
      task.priority = req.body.priority;
    }

    if (req.body.dueDate) {
      task.dueDate = req.body.dueDate;
    }

    if (req.body.status) {
      task.status = req.body.status;
    }
    if (req.body.criteria) {
      task.criteria = req.body.criteria
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const deletedTask = await Task.deleteOne({ _id: task });
    res.json(deletedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
