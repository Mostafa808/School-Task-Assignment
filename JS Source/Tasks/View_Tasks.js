class task_UI{
    /**
     * @param {task} this_task
     */
    static view_task(this_task){
        let this_task_index = tasks_handler.search(this_task.id);
        let this_user_index = users_handler.search(current_user.username);
        if(current_user.tasks_index.includes(this_task_index)){
            if(this_task.from_user_index==this_user_index && current_user.is_admin){
                let task_item = element_handler.basic(null, "div", null, ["task-item", this_task.id]);
                let task_title = element_handler.basic("Task Title: ", "div", null, ["task-title"]);
                task_title.appendChild(element_handler.basic(this_task.title,"span"));
                task_item.appendChild(task_title);

                let assign_to = element_handler.basic(null, "div", null);
                let basic_assigned_to = element_handler.basic("Assigned To: ");
                let assigned_to_users = tasks_handler.get_task_users(this_task);
                let assigned_to_usernames = [];
                for(let thisuser of assigned_to_users){
                    assigned_to_usernames.push(thisuser.username);
                }
                basic_assigned_to.appendChild(element_handler.basic(assigned_to_usernames.toString(),"span", null, ["task-to"]));
                
                assign_to.appendChild(basic_assigned_to);
                task_item.appendChild(assign_to);
                task_item.appendChild(element_handler.basic(null,"hr"));
                
                let task_proirity_section = element_handler.basic("Proirity: ","div");
                let current_priority = "";
                if (this_task.priority==0){
                    current_priority = "None";
                }
                else if(this_task.priority==1){
                    current_priority = "Low";
                }
                else if(this_task.priority==2){
                    current_priority = "Medium";
                }
                else if(this_task.priority==3){
                    current_priority = "High";
                }

                let task_proirity = element_handler.basic(current_priority,"span",null,["task-priority", "priority-"+current_priority.toLowerCase()]);
                task_proirity_section.appendChild(task_proirity);
                task_item.appendChild(task_proirity_section);

                let deadline_section = element_handler.basic("Deadline: ", "div");
                let deadline = element_handler.basic(this_task.deadline, "span", null, "task-deadline");
                deadline_section.appendChild(deadline);
                task_item.appendChild(deadline_section);

                let description_section = element_handler.basic("Description: ", "div");
                let description = element_handler.basic(this_task.description,"span", null, ["task-description"]);
                description_section.appendChild(description);
                task_item.appendChild(description_section);

                let status_section = element_handler.basic("Status: ", "div");
                let is_completed = "In Progress";
                let is_completed_class = "incompleted"
                if(this_task.completed){
                    is_completed = "Completed";
                    is_completed_class = "completed"
                }
                let status = element_handler.basic(is_completed,"span", null, ["task-progress", is_completed_class]);
                status_section.appendChild(status);
                task_item.appendChild(status_section);

                let task_actions = element_handler.basic(null,"div",null,["task-actions"])
                let edit_task = element_handler.basic(null,"input",null, ["edit-task"])
                edit_task.type = "button";
                edit_task.value = "Edit Task";
                
                edit_task.onclick = function(){
                    handle_tap(edit_task);
                };
                task_actions.appendChild(edit_task);

                let delete_task = element_handler.basic(null,"input",null, ["delete-task"])
                delete_task.type = "button";
                delete_task.value = "Delete Task";

                delete_task.onclick = function(){
                    handle_tap(delete_task);
                };
                task_actions.appendChild(delete_task);
                task_item.appendChild(task_actions);
                document.getElementById("tasks-assigned-to-by-list").firstElementChild.appendChild(task_item);
            }
            if(this_task.to_users_indexes.includes(this_user_index)){
                let task_item = element_handler.basic(null, "div", null, ["task-item", this_task.id]);
                let task_title = element_handler.basic("Task Title: ", "div", null, ["task-title"]);
                task_title.appendChild(element_handler.basic(this_task.title,"span"));
                task_item.appendChild(task_title);

                let assign_by = element_handler.basic(null, "div", null);
                let basic_assigned_by = element_handler.basic("Assigned By: ");
                let assign_by_user = users[this_task.from_user_index];
                let assigned_by_username = assign_by_user.username;
                
                basic_assigned_by.appendChild(element_handler.basic(assigned_by_username,"span", null, ["task-from"]));
                
                assign_by.appendChild(basic_assigned_by);
                task_item.appendChild(assign_by);
                task_item.appendChild(element_handler.basic(null,"hr"));
                
                let task_proirity_section = element_handler.basic("Proirity: ","div");
                let current_priority = "";
                if (this_task.priority==0){
                    current_priority = "None";
                }
                else if(this_task.priority==1){
                    current_priority = "Low";
                }
                else if(this_task.priority==2){
                    current_priority = "Medium";
                }
                else if(this_task.priority==3){
                    current_priority = "High";
                }

                let task_proirity = element_handler.basic(current_priority,"span",null,["task-priority", "priority-"+current_priority.toLowerCase()]);
                task_proirity_section.appendChild(task_proirity);
                task_item.appendChild(task_proirity_section);

                let deadline_section = element_handler.basic("Deadline: ", "div");
                let deadline = element_handler.basic(this_task.deadline, "span", null, "task-deadline");
                deadline_section.appendChild(deadline);
                task_item.appendChild(deadline_section);

                let description_section = element_handler.basic("Description: ", "div");
                let description = element_handler.basic(this_task.description,"span", null, ["task-description"]);
                description_section.appendChild(description);
                task_item.appendChild(description_section);

                let status_section = element_handler.basic("Status: ", "div");
                let is_completed = "In Progress";
                let is_completed_class = "incompleted"
                if(this_task.completed){
                    is_completed = "Completed";
                    is_completed_class = "completed"
                }
                let status = element_handler.basic(is_completed,"span", null, ["task-progress", is_completed_class]);
                status_section.appendChild(status);
                task_item.appendChild(status_section);

                let task_actions = element_handler.basic(null,"div",null,["task-actions"])
                let completed_button_class = "";
                let switch_completed = element_handler.basic(null,"input",null)
                switch_completed.type = "button";
                if(this_task.completed){
                    switch_completed.classList.add("mark-incompleted-button")
                    switch_completed.value = "Mark As Incompleted";
                }
                else{
                    switch_completed.classList.add("mark-completed-button")
                    switch_completed.value = "Mark As Completed";
                }
                switch_completed.onclick = function(){
                    handle_tap(switch_completed);
                };

                task_actions.appendChild(switch_completed);
                task_item.appendChild(task_actions);
                document.getElementById("tasks-assigned-to-me-list").firstElementChild.appendChild(task_item);
            }
        }
    }
    static get_search_data(){
        search_data = new search_data_model();
        search_data.search_content = document.getElementById("advanced-search-field").value;
        if(!search_data.search_content){
            search_data.search_content = document.getElementById("SearchField").value;
            document.getElementById("advanced-search-field").value = search_data.search_content;
        }
        search_data.sort_by = document.getElementById("sort-by").value;
        search_data.reversed = document.getElementById("reversed-sort").checked;
        search_data.include_completed = document.getElementById("completed").checked;
        search_data.include_incompleted = document.getElementById("in-progress").checked;
        basic_memory.set_object("search_data", search_data)
    }
    static search_task(reload_flag = false){
        this.get_search_data();
        let current_tasks = tasks_handler.get_user_tasks(current_user);
        let output_tasks = [];
        for(let this_task of current_tasks){
            if(this_task.id.includes(search_data.search_content)||
                this_task.title.includes(search_data.search_content)||
                this_task.deadline.includes(search_data.search_content)||
                this_task.description.includes(search_data.search_content)||
                !search_data.search_content
                ){
                if(search_data.include_completed && this_task.completed){
                    output_tasks.push(this_task);
                }
                if(search_data.include_incompleted && !this_task.completed){
                    output_tasks.push(this_task);
                }
            }
        }
        output_tasks = tasks_handler.sort_tasks(output_tasks, search_data.sort_by);
        if(search_data.reversed){
            output_tasks = output_tasks.reverse();
        }
        if(reload_flag){
            element_handler.goto_link("Tasks.html");
        }
        return output_tasks;
    }
    static init_page(){
        document.getElementById("advanced-search-field").value = search_data.search_content;
        document.getElementById("sort-by").value = search_data.sort_by;
        document.getElementById("reversed-sort").checked = search_data.reversed;
        document.getElementById("completed").checked = search_data.include_completed;
        document.getElementById("in-progress").checked = search_data.include_incompleted;
        let current_tasks = this.search_task();
        for(let thistask of current_tasks){
            this.view_task(thistask);
        }
    }
    static set_current_task(this_task){
        current_selected_task = this_task;
    }
}
