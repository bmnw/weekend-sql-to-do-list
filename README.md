# PROJECT NAME

One Thing At A Time

## Description

_Duration: 2 Weeks_

One Thing At A Time provides the user with an app that records tasks and tracks their respective due dates.

The user provides three inputs: the task to complete, the due date, and the priority level of the task (low, medium, high). All inputs are required. 

When the user adds the task, they will see it append to the list of tasks on the webpage. The tasks are ordered by due date, so the tasks with the soonest due date are at the top of the list. 

When a user completes a task and clicks the 'Completed It!' button, the color of the task changes from grey to white and the task is checked off the list. If that was a mistake, the user can click 'Not Done Yet' to mark the task as not done.

If a task is overdue, the due date will be red and a red badge that says 'Overdue' will show next to the task description. When the user completes an overdue task, those warnings disappear. 

To delete a task from the list, the user can click 'Delete Task'. Clicking 'Delete Task' will trigger a pop-up box that asks the user to confirm that they want to delete the task. If yes, the task is permanently deleted. If no, the task remains.

## Screen Shot

![One Thing At A Time example task list screenshot](images/One%20Things%20At%20A%20Time%20ex%20task%20list.png)

![One Thing At A Time delete comfirmation screenshot](images/One%20Thing%20At%20A%20Time%20delete%20confirmation.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [nodemon] (https://nodemon.io/)
- [Express] (https://expressjs.com/)
- [PostgresSQL] (https://www.postgresql.org/download/)

## Installation

1. Create a database named `weekend-to-do-app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`,
4. Run `npm install -g nodemon` if nodemon is not already installed on your device
5. Run `npm start` in your terminal to start the server,
6. Open your browser and navigate to localhost:5000,
7. Start tracking your tasks!

## Usage

When you're feeling overwhelmed by your day or your week, it can be hard start actually working on things. In those moments, making a list of what you need to do can help immensely! 

One Thing At A Time is a low-stress, simple way of keeping track of what needs to get done. Describe the task, enter the due date, click the priority level, and add the task. You'll see all of your entries being added to the list on your screen. Later you can update the list when you've completed a task. You can also delete a task from the list if it's no longer needed. 

Sometime life happens and we overlook things. One Thing At A Time checks daily for overdue tasks and will indicate if there is something that needs your attention. 

So take a deep breath. You've got this. Take a few minutes to make a list, and then focus on One Thing At A Time.

## Built With

- HTML
- CSS
- JavaScript
- Node
- Express
- PostgreSQL
- Postico
- Sweet Alerts
- Bootstrap