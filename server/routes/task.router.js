const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

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
    const queryText =   `INSERT INTO "tasks" ("task_description", "complete")
                        VALUES ($1, $2);` // the value for "complete" will default to false in the database
    pool.query(queryText, [taskToAdd.taskDescription, taskToAdd.complete])
        .then((result) => {
            console.log(result);
            res.send(200);
        })
        .catch((error) => {
            console.log('ERROR IN POST /tasks', error);
        });
});

// DELETE

router.delete('/:id', (req, res) => {
    console.log('in DELETE');
    const queryText = 'DELETE FROM "tasks" WHERE "id" = $1;'
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(200);
        })
        .catch((error) => {
            console.log('ERROR in DELETE /tasks', error);
            res.sendStatus(500);
        });
});

// PUT

router.put('/:id', (req, res) => {
    console.log('in PUT');
    let taskID = req.params.id;
    let complete = req.body.complete;
    console.log(complete);
    let queryText = '';
    if(complete === 'true'){
        queryText = `UPDATE "tasks" SET "complete" = false WHERE "id" = $1;`
    } else if(complete === 'false' || complete === 'undefined'){
        queryText = `UPDATE "tasks" SET "complete" = true WHERE "id" = $1;`
    }
    console.log('queryText', queryText);
    pool.query(queryText, [taskID])
        .then((result) => {
            res.send(200);
        })
        .catch((error) => {
            console.log('ERROR in PUT /tasks', error);
            res.sendStatus(500);
        });
});




module.exports = router;