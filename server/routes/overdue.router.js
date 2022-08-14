const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// PUT

router.put('/', (req, res) => {
    console.log('in PUT /overdue');
    let queryText = `UPDATE "tasks"
                    SET "overdue" = true 
                    WHERE "todays_date" > "due_date";`
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('ERROR in PUT /overdue', error);
            res.sendStatus(500);
        });
});





module.exports = router;