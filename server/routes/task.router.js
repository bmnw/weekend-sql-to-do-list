const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

const tasks = [];

// GET
router.get('/', (req, res) => {
    console.log('in GET /tasks');
    // the query to run
    const queryText = 'SELECT * FROM "tasks";';
    // use pool to run the query
    pool.query(queryText).then((result) => {
        console.log('SELECT SUCCESS', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR in GET /tasks', error);
        res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
    const taskToAdd = req.body;
    console.log('new task:', taskToAdd);
    const queryText =   `INSERT INTO "tasks" ("task_description")
                        VALUES ($1);` // the value for "complete" will default to false in the database
    pool.query(queryText, [taskToAdd.taskDescription])
        .then((result) => {
            console.log(result);
            res.send(200);
        })
        .catch((error) => {
            console.log('ERROR IN POST /tasks', error);
        });
});







module.exports = router;