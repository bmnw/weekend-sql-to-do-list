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
        // clearInputs();
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
                <tr>
                    <td>${task.taskDescription}</td>
                    <td>
                        <button class="complete-submit">Completed it!</button>
                    </td>
                    <td>
                        <button class="delete-submit">Delete Task</button>
                    </td>
                </tr>
            `);
        }
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong. Please try again.');
    });
} // end displayTasks