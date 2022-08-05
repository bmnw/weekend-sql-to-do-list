const express = require('express');
const router = express.Router();

const tasks = [];

router.post('/', (req, res) => {
    const taskToAdd = req.body;
    console.log('new task:', taskToAdd);
    tasks.push(taskToAdd);
    console.log('task array:', tasks);
});







module.exports = router;