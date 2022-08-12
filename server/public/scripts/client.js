console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    displayTasks();
    $('#task-submit').on('click', addTaskToDatabase);
    $('body').on('click', '.complete-submit', taskComplete);
    $('body').on('click', '.delete-submit', taskDelete);
    $('body').on('click', '.mark-as-not-complete', markAsNotComplete);
}

// post request sending user input task to database

function addTaskToDatabase() {
    // for right now, this will add task to array in task.router.js
    console.log('in addTaskToDatabase');
    let date = new Date();
    console.log('date:', date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}/${month}/${day}`;
    console.log('currentDate:', currentDate);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            taskDescription: $('#task-input').val(),
            date_submitted: currentDate,
            due_date: $('#due-date-input').val(),
            priority: $('#priority-input').val()
            // complete: false // in the database the default value for "complete" is false, user input is needed to change that to true
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
            // console.log('dueDate:', dueDate);
            if(task.complete === false) {
                $('#task-list').append(`
                    <tr data-complete=${task.complete}>
                        <td>${formattedDueDate}</td>
                        <td class="task-des-display">${task.task_description}</td>
                        <td data-priority="${task.priority}">${task.priority}</td>
                        <td>
                            <button class="complete-submit" data-id=${task.id}>Completed it!</button>
                        </td>
                        <td></td>
                        <td>
                            <button class="delete-submit" data-id=${task.id}>Delete Task</button>
                        </td>
                    </tr>
                `);
            } else if(task.complete === true) {
                $('#task-list').append(`
                    <tr data-complete=${task.complete}>
                        <td>${formattedDueDate}</td>
                        <td class="task-des-display">${task.task_description}</td>
                        <td data-priority="${task.priority}">${task.priority}</td>
                        <td>
                            ✅
                        </td>
                        <td>
                            <button class="mark-as-not-complete" data-id="${task.id}">Not Done Yet</button>
                        </td>
                        <td>
                            <button class="delete-submit" data-id=${task.id}>Delete Task</button>
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

// clear input field after 'add task' button is clicked

function clearInputs() {
    console.log('in clearInputs');
    $('#task-input').val('');
    $('#due-date-input').val('');
} // end clearInputs

// delete request to remove a task from the database

function taskDelete() {
    console.log('in taskDelete');
    const taskID = $(this).data('id');
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
        // $(this).replaceWith('✅');
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
