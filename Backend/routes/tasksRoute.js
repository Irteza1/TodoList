const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
const { validateToken } = require('../middleware/tokenValidation');

router.get('/',validateToken, taskController.getAllTasks);

router.post('/',validateToken, taskController.createTask);

router.put('/:id',validateToken, taskController.updateTask);

router.delete('/:id',validateToken, taskController.deleteTask);

module.exports = router;
