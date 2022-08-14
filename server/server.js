const express = require('express');
console.log('is nodemon working?');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

// routes
const taskRouter = require('./routes/task.router.js');
app.use('/tasks', taskRouter);

const overdueRouter = require('./routes/overdue.router.js');
app.use('/overdue', overdueRouter);



app.listen(PORT, () => {
    console.log('listening on port', PORT);
});