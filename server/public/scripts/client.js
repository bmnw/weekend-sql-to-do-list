console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    updateTodaysDate();
    displayTasks();
    // swal("Hello world!");
    $('.priority-level').on('click', selectPriorityLevel);
    $('#task-submit').on('click', addTaskToDatabase);
    $('body').on('click', '.complete-submit', taskComplete);
    $('body').on('click', '.delete-submit', taskToDelete);
    $('body').on('click', '.mark-as-not-complete', markAsNotComplete);
}

// capturing the priority level selected by the user for the added task

let priorityLevel = '';

function selectPriorityLevel() {
    console.log('in selectPriorityLevel');
    priorityLevel = $(this).data('priority');
    console.log(priorityLevel);
    return priorityLevel;
} // end selectPriorityLevel

// capture the date that a task is submitted

let currentDate = '';

function getCurrentDate() {
    console.log('in getCurrentDate');
    let date = new Date();
    console.log('date:', date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    currentDate = `${year}/${month}/${day}`;
    console.log(currentDate);
    return currentDate;
} // end getCurrentDate

// post request sending user input task to database

function addTaskToDatabase() {
    console.log('in addTaskToDatabase');
    getCurrentDate();
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            taskDescription: $('#task-input').val(),
            date_submitted: currentDate,
            due_date: $('#due-date-input').val(),
            priority: priorityLevel
        }
    }).then( function (response) {
        console.log(response);
        displayTasks();
        clearInputs();
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end addTaskToDatabase

// get request for contents of tasks array, displaying contents on the DOM if successful

function displayTasks() {
    console.log('in displayTasks');
    checkForOverdueTasks();
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then( function (response) {
        console.log(response);
        $('#task-list').empty();
        for(let task of response){
            let dueDate = new Date(task.due_date);
            let formattedDueDate = dueDate.toLocaleDateString('en-us', {weekday:'short', month:'long', day: 'numeric', year: 'numeric'});
            console.log('formattedDueDate:', formattedDueDate);
            if(task.complete === false && task.overdue === true) {
                $('#task-list').append(`
                    <tr data-complete=${task.complete}>
                        <td class="bg-danger text-white" data-overdue="${task.overdue}">${formattedDueDate}</td>
                        <td class="task-des-display">${task.task_description} <span class="badge bg-danger">Overdue</span></td>
                        <td data-priority="${task.priority}">${task.priority}</td>
                        <td>
                            <button type="button" class="btn btn-success complete-submit" data-id=${task.id}>Completed it!</button>
                        </td>
                        <td></td>
                        <td>
                            <button type="button" class="btn btn-danger delete-submit" data-id=${task.id}>Delete Task</button>
                        </td>
                    </tr>
            `);} else if(task.complete === false) {
                $('#task-list').append(`
                    <tr data-complete=${task.complete}>
                        <td data-overdue="${task.overdue}">${formattedDueDate}</td>
                        <td class="task-des-display">${task.task_description}</td>
                        <td data-priority="${task.priority}">${task.priority}</td>
                        <td>
                            <button type="button" class="btn btn-success complete-submit" data-id=${task.id}>Completed it!</button>
                        </td>
                        <td></td>
                        <td>
                            <button type="button" class="btn btn-danger delete-submit" data-id=${task.id}>Delete Task</button>
                        </td>
                    </tr>
            `);} else if(task.complete === true) {
                $('#task-list').append(`
                    <tr data-complete=${task.complete}>
                        <td>${formattedDueDate}</td>
                        <td class="task-des-display">${task.task_description}</td>
                        <td data-priority="${task.priority}">${task.priority}</td>
                        <td>
                            ✅
                        </td>
                        <td>
                            <button type="button" class="btn btn-info text-white mark-as-not-complete" data-id="${task.id}">Not Done Yet</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger delete-submit" data-id=${task.id}>Delete Task</button>
                        </td>
                    </tr>
                `);
            }
        }
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end displayTasks

// put request that updates "todays_date" for all tasks in the database

function updateTodaysDate() {
    console.log('in updateTodaysDate');
    $.ajax({
        type: 'PUT',
        url: '/todaysDate'
    }).then( function(response) {
        console.log(response);
    }).catch( function(error) {
        console.log(error);
        alert('Something went wrong in updating the current date');
    });
}

// put request that checks to see if any of the tasks are overdue

function checkForOverdueTasks() {
    console.log('in checkForOverdueTasks');
    $.ajax({
        type: 'PUT',
        url: '/overdue'
    }).then( function(response) {
        console.log(response);
    }).catch( function(error) {
        console.log(error);
        alert('Something went wrong in checking for overdue tasks.');
    });
} // end checkForOverdueTasks

// clear input field after 'add task' button is clicked

function clearInputs() {
    console.log('in clearInputs');
    $('#task-input').val('');
    $('#due-date-input').val('');
    $('#priority-input').val('');
} // end clearInputs

// capture the id of the task to be deleted

let taskID = 0;

function taskToDelete() {
    console.log('in taskToDelete');
    taskID = $(this).data('id');
    console.log('taskID:', taskID);
    confirmDeleteTask();
}

// delete request to remove a task from the database

function taskDelete() {
    console.log('in taskDelete');
    console.log('taskID:', taskID);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskID}`
    }).then( function(response) {
        console.log(response);
        displayTasks();
    }).catch( function(error){
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end taskDelete

// using sweetalert to ask the user to confirm that the selected task should be deleted

function confirmDeleteTask(){
    console.log('in confirmDeleteTask');
    swal({
        title: "Are you sure you want to delete this task?",
        text: "It will be gone forever!",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if(willDelete) {
            swal("Task deleted!", {
                icon: "success",
            });
            taskDelete();
        } else {
            swal("The task remains. Good catch!");
        }
    });
}

function taskComplete() {
    console.log('in taskComplete');
    const taskID = $(this).data('id');
    const dataComplete = $(this).parent().parent().data('complete');
    console.log('taskID:', taskID);
    console.log('data-complete', dataComplete);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskID}`,
        data: {
            complete: dataComplete
        }
    }).then( function(response) {
        console.log(response);
        displayTasks();
    }).catch( function(error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end taskComplete

// PUT request to change selected task from complete to not complete in the database

function markAsNotComplete() {
    console.log('in markAsNotComplete');
    const taskID = $(this).data('id');
    console.log('taskID:', taskID);
    const dataComplete = $(this).parent().parent().data('complete');
    console.log('data-complete', dataComplete);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskID}`,
        data: {
            complete: dataComplete
        }
    }).then( function(repsonse) {
        displayTasks();
    }).catch( function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end markAsNotComplete
