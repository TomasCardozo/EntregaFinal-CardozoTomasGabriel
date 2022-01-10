// Clase
class Tasks{
    constructor(id, task, status){
        this.id = id;
        this.task=task;
        this.status=status;
        this.deleted=false;
    }
}

// API 
const url =`https://jsonplaceholder.typicode.com/posts`;
const nR = () => Math.floor((Math.random()*100));

$("#addRandomTaskbtn").click(()=> { 
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            let a = nR();
            let takRandom=`${response[a].id} - ${response[a].title}`;
            addTask(takRandom);
        }
    });
});

//ADD TASK
function addTask(taskInputFunct){
    let tasksA = JSON.parse(localStorage.getItem("task1")) || [];
    let task = String(taskInputFunct);
    let status = true;
    tasksA.push(new Tasks(tasksA.length, task, status));
    addLS(tasksA);
}

//ADD LS
function addLS(tasksAO){
    const xToJSON = JSON.stringify(tasksAO);
    localStorage.setItem("task1", xToJSON);
    showTask();
}

function showTask(){
    const tS = JSON.parse(localStorage.getItem("task1"));
    
    if(tS!==null){
        $(".taskList").html("");
        for(const i of tS){
            if(!i.deleted){
                if(i.status){
                    $('.taskList').append(
                        `<label class="col-10 mt-1 rounded list-group-item  btn-outline-dark efectTask iTB" id="${i.id}-t" for="">${i.task}</label>
                        
                        <button id="${i.id}-b" class="col-1 btn btn-primary doneTask efectTask"><i id="${i.id}-bi" class="far fa-square"></i></button>
                        
                        <button id="${i.id}-d" class="col-1 btn btn-danger delTask efectTask"><i id="${i.id}-di" class="fas fa-trash-alt"></i></button>`
                    );
                }else{
                    $('.taskList').append(
                        `<label class="col-10 mt-1 rounded list-group-item  btn-outline-dark efectTask iTB text-decoration-line-through bg-warning" id="${i.id}-t" for="">${i.task}</label>
                        
                        <button id="${i.id}-b" class="col-1 btn btn-secondary doneTask efectTask"><i id="${i.id}-bi" class="far fa-check-square"></i></button>
                        
                        <button id="${i.id}-d" class="col-1 btn btn-danger delTask efectTask"><i id="${i.id}-di" class="fas fa-trash-alt"></i></button>`
                    );
                }
            }
        }
    }else{
        $(".taskList").html("");
    }
    $(`.doneTask`).click(changeStatus);
    $(`.delTask`).click(deleteXTask);
}

function notDone(){
    const tS = JSON.parse(localStorage.getItem("task1"));
    if(tS!==null){
        $(".taskList").html("");
        for(const i of tS){
            if(!i.deleted){
                if(i.status){
                    $('.taskList').append(
                        `<label class="col-10 mt-1 rounded list-group-item  btn-outline-dark efectTask iTB" id="${i.id}-t" for="">${i.task}</label>
                        
                        <button id="${i.id}-b" class="col-1 btn btn-primary doneTask efectTask"><i id="${i.id}-bi" class="far fa-square"></i></button>
                        
                        <button id="${i.id}-d" class="col-1 btn btn-danger delTask efectTask"><i id="${i.id}-di" class="fas fa-trash-alt"></i></button>`
                    );
                }
            }
        }
    }else{
        $(".taskList").html("");
    }
    $(`.doneTask`).click(changeStatus);
    $(`.delTask`).click(deleteXTask);

}

function isDone(){
    const tS = JSON.parse(localStorage.getItem("task1"));
    
    if(tS!==null){
        $(".taskList").html("");
        for(const i of tS){
                if(!i.deleted){
                if(!i.status){
                    $('.taskList').append(
                        `<label class="col-10 mt-1 rounded list-group-item  btn-outline-dark efectTask iTB text-decoration-line-through bg-warning" id="${i.id}-t" for="">${i.task}</label>
                        
                        <button id="${i.id}-b" class="col-1 btn btn-secondary doneTask efectTask"><i id="${i.id}-bi" class="far fa-check-square"></i></button>
                        
                        <button id="${i.id}-d" class="col-1 btn btn-danger delTask efectTask"><i id="${i.id}-di" class="fas fa-trash-alt"></i></button>`
                    );
                }
            }
        }
    }else{
        $(".taskList").html("");
    }
    $(`.doneTask`).click(changeStatus);
    $(`.delTask`).click(deleteXTask);

}

//CHECK TASK-LENGTH
function checkInput (e) { 
    e.preventDefault();
    $(`.quitar`).html("");
    
    if ($(`#taskInput`).val().length > 70 || $(`#taskInput`).val().length < 3) {
        $(`#taskInput`).addClass('is-invalid');
        $(`#taskInput`).removeClass('is-valid');

        $(`#quitar`).addClass(`invalid-feedback`);
        $(`#quitar`).removeClass(`valid-feedback`);
        $(`#quitar`).text(`La tarea no contiene de 3 a 70 caracteres.`);
    }else {
        $(`#taskInput`).addClass('is-valid');
        $(`#taskInput`).removeClass('is-invalid');
        
        $(`#quitar`).addClass(`valid-feedback`);
        $(`#quitar`).removeClass(`invalid-feedback`);
        $(`#quitar`).text(`La tarea se agrego correctamente.`);
        addTask($(`#taskInput`).val());
        showTask();
        $(`#taskInput`).val(``)
    }
}


// TASK CHANGE STATUS
function changeStatus(t){
    const tS = JSON.parse(localStorage.getItem("task1"));
    let idB = t.target.getAttribute(`id`)

    let a = Number(idB.split("-",1));
    let idT = `${a}-t`

    tS[a].status = !(tS[a].status != false);
    
    if(!tS[a].status){
        $(`#${a}-b`).replaceWith(`
            <button id="${a}-b" class="col-1 btn btn-secondary doneTask efectTask"><i id="${a}-bi" class="far fa-check-square"></i></button>
        `);
        $(`#${idT}`).addClass("text-decoration-line-through bg-warning");
    }else{
        $(`#${a}-b`).replaceWith(`
            <button id="${a}-b" class="col-1 btn btn-primary doneTask efectTask"><i id="${a}-bi" class="far fa-square"></i></button>
        `);
        $(`#${idT}`).removeClass("text-decoration-line-through bg-warning");
    }
    addLS(tS);
}

$('.taskInputC').focusout(function () { 
    $('.efectTask')
        .slideDown()
                .animate({ opacity: 1} , "slow");
});
// LOGIC DELETE X TASK
function deleteXTask(x){
    const tS = JSON.parse(localStorage.getItem("task1"));
    let idB = x.target.getAttribute(`id`)
    let a = Number(idB.split("-",1));

    tS[a].deleted = true;
    addLS(tS);

    $(`#${a}-t`).replaceWith("");
    $(`#${a}-b`).replaceWith("");
    $(`#${a}-d`).replaceWith("");
}

// DELETE ALL TASKS
function deleteTask(){
    localStorage.clear();
    showTask();
}

function cleanInput(){
    $(".taskInputC").val("");
    $(`#quitar`).replaceWith(`<div id="quitar"></div>`);
}

 showTask();


$(`.taskInputC`).click(cleanInput);

$(`.allTask`).click(showTask);
$(`#deleteTasks`).click(deleteTask);
$(`.isDone`).click(isDone);
$(`.notDone`).click(notDone);
$('.addTaskF').submit(checkInput);

//EFECTOS

$('.taskInputC').focusin(function () { 
    $(`#quitar`).removeClass(`invalid-feedback`);
    $(`#quitar`).removeClass(`valid-feedback`);
    $(`#taskInput`).removeClass('is-valid');
    $(`#taskInput`).removeClass('is-invalid');

    $('.efectTask')
        .animate({ opacity: .2} , "slow")
                .slideUp();
});

