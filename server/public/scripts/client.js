console.log('js sourced');

$(readyNow);

function readyNow() {
    console.log('ready now');
    $('#task-submit').on('click', addTaskToDatabase);
}

// post request sending user input task to database

function addTaskToDatabase() {
    // for right now, this will add task to array in task.router.js
    console.log('in addTaskToDatabase');
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            taskDescription: $('#task-input').val()
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