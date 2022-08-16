const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// PUT

router.put('/', (req, res) => {
    console.log('in PUT /todaysDate');
    let queryText = `UPDATE "tasks"
                    SET "todays_date" = CURRENT_DATE;`
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('ERROR in PUT /todaysDate', error);
            res.sendStatus(500);
        });
});

module.exports = router;