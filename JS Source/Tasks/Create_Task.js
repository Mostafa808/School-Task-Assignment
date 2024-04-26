function init_create_task_page(){
    if(current_selected_task && edit_task_flag){
        document.getElementById("task-id-field").value = current_selected_task.id;
        document.getElementById("teachers").value = tasks_handler.get_task_users(current_selected_task).map(function(olduser){
            return olduser.username;
        }).toLocaleString();
        document.getElementById("TaskTitleInput").value = current_selected_task.title;
        let current_priority = "#priority-selector > :nth-child("+(current_selected_task.priority*2+1)+")"
        document.querySelector(current_priority).checked = true;
        document.getElementById("deadline").value = new Date(current_selected_task.deadline).toISOString().slice(0, 16);
        document.getElementById("description-field").value = current_selected_task.description;
    }
    else{
        document.getElementById("teachers").placeholder = users.map(function(olduser){
            return olduser.username;
        }).toLocaleString();
        document.getElementById("teachers").title = document.getElementById("teachers").placeholder;
    }
}