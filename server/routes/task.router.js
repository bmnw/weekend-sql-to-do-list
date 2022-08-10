const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

const tasks = [];

// GET
router.get('/', (req, res) => {
    res.send(tasks);
});

// POST
router.post('/', (req, res) => {
    const taskToAdd = req.body;
    console.log('new task:', taskToAdd);
    tasks.push(taskToAdd);
    console.log('task array:', tasks);
    res.sendStatus(200);
});







module.exports = router;