console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    displayTasks();
    $('#task-submit').on('click', addTaskToDatabase);
    $('body').on('click', '.complete-submit', taskComplete);
    $('body').on('click', '.delete-submit', taskDelete);
}

// post request sending user input task to database

function addTaskToDatabase() {
    // for right now, this will add task to array in task.router.js
    console.log('in addTaskToDatabase');
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            taskDescription: $('#task-input').val(),
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
            $('#task-list').append(`
                <tr data-complete="false">
                    <td class="task-des-display">${task.task_description}</td>
                    <td>
                        <button class="complete-submit" data-id=${task.id}>Completed it!</button>
                    </td>
                    <td>
                        <button class="delete-submit" data-id=${task.id}>Delete Task</button>
                    </td>
                </tr>
            `);
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
} // end clearInputs

function taskComplete() {
    console.log('in taskComplete');
    const taskID = $(this).data('id');
    console.log('taskID:', taskID);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskID}`
    }).then( function(response) {
        console.log(response);
        displayTasks();
    }).catch( function(error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
    // let isComplete = $(this).parent().parent().data('complete');
    // // need a way to preserve that a task has been completed
    // console.log('complete?', isComplete); // false
    // isComplete = true;
    // console.log('complete?', isComplete); // true
    $(this).parent().parent().css("background-color", "lightgreen");
    $(this).replaceWith('✅');
} // end taskComplete

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
