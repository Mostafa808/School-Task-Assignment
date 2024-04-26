/* The user have Username, Name, Email, Address, School Department, Date of Birth, Link to profile image, Password, Is Admin */
class user{
    /**
     * 
     * @param {string} username 
     * @param {string} full_name 
     * @param {string} email 
     * @param {string} address 
     * @param {string} department 
     * @param {string} birth_date 
     * @param {string} profile_image 
     * @param {string} password 
     * @param {boolean} is_admin 
     * @param {[]} tasks_index
     */
    constructor(username = "", full_name = "", email = "", address = "", department = "", birth_date = "", profile_image = "", password = "", is_admin = false, website_view = "", tasks_index = []){
        this.username = username;
        this.full_name = full_name;
        this.email = email;
        this.address = address;
        this.department = department;
        this.birth_date = birth_date;
        this.profile_image = profile_image;
        this.password = password;
        this.is_admin = is_admin;
        this.website_view = website_view;
        this.tasks_index = tasks_index;
    }
}
class basic_memory{
    static set_object(key, value){
        var raw_data = JSON.stringify(value);
        if(raw_data){
            window.localStorage.setItem(key, raw_data);
            return true;
        }
        return false;
    }
    static get_object(key){
        var value = JSON.parse(window.localStorage.getItem(key));
        return value;
    }
    static del_object(key){
        window.localStorage.removeItem(key);
        return true;
    }
    static clear(){
        window.localStorage.clear()
        return true;
    }
    static view(){
        return window.localStorage
    }
}
class element_handler{
    static basic(content, type, id=null, classes=[]){
        /**@type {HTMLElement} */
        var elem = document.createElement(type);
        if(content!=null){
            elem.textContent = content;
        }
        if(id!=null){
            if(!this.check_id(id)){
                elem.id = id;
            }
        }
        for (let class_name of classes) {
            elem.classList.add(class_name);
          }
        return elem;
    }
    static link(content, link, id=null, classes=[], click = false){
        var mylink = this.basic(content,'a', id, classes)
        mylink.href = link;
        if(click){
            var document_handler = document.getElementById("document-handler")
            document_handler.appendChild(mylink);
            mylink.click();
        }
        return mylink
    }
    /**
     * 
     * @param {string} href 
     * @param {string} id 
     * @param {[string]} classes 
     */
    static stylesheet(href, id = null, classes=[]){
        var mystyle = document.createElement('link');
        mystyle.rel = "stylesheet";
        mystyle.href = href;
        if(id!=null){
            mystyle.id = id;
        }
        for (let class_name of classes) {
            mystyle.classList.add(class_name);
        }
        return mystyle;
    }
    /**
     * @param {HTMLElement} element
     */
    static remove_children(element){
        element.innerHTML = '';
        return true;
    }
    static get_id(id){
        return document.getElementById(id);
    }
    static check_id(id){
        // is id exists?
        return !(this.get_id(id)==null);
    }
    static goto_link(link){
        if(recursive){
            link = "../../"+link;
        }
        this.link('',link,null,[],true)
    }
}
class users_handler{
    /** @param {user} newuser */
    static set_user(newuser, current=false){
        var exists = this.search(newuser.username);
        if (exists!=null){
            users[exists] = newuser;
        }
        else{
            users.push(newuser);
        }
        if(current){
            current_user = newuser;
            basic_memory.set_object("current_user",current_user);
        }
        this.save_users();
    }
    /**
     * 
     * @param {user} oldUser 
     */
    static del_user(oldUser){
        var exists = this.search(oldUser.username);
        if (exists!=null){
            users.splice(exists, 1);
            this.save_users();
        }

    }
    static save_users(){
        basic_memory.set_object("users", users)
    }
    static search(username){
        var index = 0;
        if(users != null){
            for(let this_user of users){
                if(this_user.username==username){
                    return index;
                }
                index+=1;
            }
        }
        return null;
    }
    /**
     * 
     * @param {task} newtask 
     */
    static add_task(newtask, new_task_index){
        for (let user_index of newtask.to_users_indexes){
            if(!this.has_task(users[user_index], new_task_index)){
                users[user_index].tasks_index.push(new_task_index);
            }
        }
        if(!this.has_task(users[newtask.from_user_index], new_task_index)){
            users[newtask.from_user_index].tasks_index.push(new_task_index);
        }
        current_user = users[users_handler.search(current_user.username)];
        basic_memory.set_object("current_user", current_user);
        this.save_users();
    }
    static del_task(task_index){
        let user_index = 0;
        for(let user of users){
            let new_tasks = [];
            for(let task of user.tasks_index){
                if (task != task_index){
                    new_tasks.push(task)
                }
            }
            users[user_index].tasks_index = new_tasks;
            user_index += 1;
        }
        current_user = users[users_handler.search(current_user.username)];
        basic_memory.set_object("current_user", current_user);
        users_handler.save_users();
    }
    static has_task(thisuser, task_index){
        for(let old_index of thisuser.tasks_index){
            if(old_index==task_index){
                return true;
            }
        }
        return false
    }
}
// form handler
class form_handler{
    /**
     * @param {HTMLInputElement} field 
     * @returns {boolean}
     */
    static is_required(field){
        return field.required;
    }
    /**
     * 
     * @param {HTMLInputElement} field 
     * @param {string} field_name 
     * @returns {boolean}
     */
    static validate_field(field, field_name){
        if(this.is_required(field) && !Boolean(field.value)){
            window.alert("Please enter: " + field_name);
            return false;
        }
        return true;
    }
    /**
     * 
     * @param {[HTMLInputElement]} fields 
     * @param {[string]} fields_names 
     */
    static validate_fields(fields, fields_names){
        for(let index=0; index < fields.length; index++){
            if(!this.validate_field(fields[index], fields_names[index])){
                return false;
            }
        }
        return true;
    }
}
// tasks and its handler
class task{
    /**
     * 
     * @param {string} id 
     * @param {string} title 
     * @param {number} from_user_index 
     * @param {[number]} to_users_indexes 
     * @param {int} priority 
     * @param {string} deadline 
     * @param {string} description 
     * @param {boolean} completed
     */
    constructor(id, title, from_user_index, to_users_indexes, priority, deadline, description = "", completed = false){
        this.id = id;
        this.title = title;
        this.from_user_index = from_user_index;
        this.to_users_indexes = to_users_indexes;
        this.priority = priority;
        this.deadline = deadline;
        this.description = description;
        this.completed = completed;
    }
}
class tasks_handler{
    /** @param {task} newtask */
    static set_task(newtask){
        var exists = this.search(newtask.id);
        if (exists!=null){
            tasks[exists] = newtask;
        }
        else{
            tasks.push(newtask);
        }
        users_handler.add_task(newtask, tasks.length-1);
        this.save_tasks();
    }
    /**
     * 
     * @param {task} oldTask 
     */
    static del_task(oldTask){
        var exists = this.search(oldTask.id);
        if (exists!=null){
            users_handler.del_task(exists);
            tasks.splice(exists,1);
            this.save_tasks();
        }

    }
    static save_tasks(){
        basic_memory.set_object("tasks", tasks)
    }
    static search(id){
        var index = 0;
        if(tasks != null){
            for(let this_task of tasks){
                if(this_task.id==id){
                    return index;
                }
                index+=1;
            }
        }
        return null;
    }
    /**
     * 
     * @param {[task]} tasks_array 
     * @param {string} sort_by 
     */
    static sort_tasks(tasks_array, sort_by){
        let output_array = [];
        if(sort_by=="id"){
            output_array = tasks_array.sort(
                function name(first, second) {
                    let firstID=first.id.toLowerCase();
                    let secondID=second.id.toLowerCase();
                    if(firstID>secondID){
                        return 1;
                    }
                    if(firstID<secondID){
                        return -1;
                    }
                     return 0;
                }
            )
        }
        else if(sort_by=="priority"){
            output_array = tasks_array.sort(
                function name(first, second) {
                    let first_priority=first.priority;
                    let second_priority=second.priority;
                    if(first_priority>second_priority){
                        return 1;
                    }
                    if(first_priority<second_priority){
                        return -1;
                    }
                     return 0;
                }
            )
        }
        else if (sort_by=="deadline"){
            output_array = tasks_array.sort(
                function name(first, second) {
                    let first_deadline=first.deadline.toLowerCase();
                    let second_deadline=second.deadline.toLowerCase();
                    if(first_deadline>second_deadline){
                        return 1;
                    }
                    if(first_deadline<second_deadline){
                        return -1;
                    }
                     return 0;
                }
            )
        }
        return output_array;
    }
    /**
     * 
     * @param {user} this_user 
     */
    static get_user_tasks(this_user){
        let output_tasks = []
        for (let task_index of this_user.tasks_index){
            output_tasks.push(tasks[task_index])
        }
        return output_tasks;
    }
    /**
     * @param {task} this_task 
     * @returns {[user]}
     */
    static get_task_users(this_task, all_flag){
        let output_users = []
        for (let user_index of this_task.to_users_indexes){
            output_users.push(users[user_index])
        }
        if(all_flag && !output_users.includes(users[this_task.from_user_index])){
            output_users.push(users[this_task.from_user_index])
        }
        return output_users;
    }
}
class search_data_model{
    constructor(search_content = '', sort_by = 'priority', reversed = false, include_completed = false, include_incompleted = true){
        this.search_content = search_content;
        this.sort_by = sort_by;
        this.reversed = reversed;
        this.include_completed = include_completed;
        this.include_incompleted = include_incompleted;
    }
}


// global settings
var recursive = false;
//memory model
/** @type {user} */
var current_user = basic_memory.get_object("current_user");
// global users
/**@type {[user]|null} */
var users = basic_memory.get_object("users");
if(users==null){
    users = []
}
// global tasks
/**@type {[task]|null} */
var tasks = basic_memory.get_object("tasks");
if(tasks==null){
    tasks = [];
}
/** @type {task} */
var current_selected_task = basic_memory.get_object("current_selected_task");
// global current search
/** @type {search_data_model} */
search_data = basic_memory.get_object("search_data");
// edit task flag
var edit_task_flag = basic_memory.get_object("edit_task_flag");
// UI Functions
function scroll_manager(){
    var aside_node = document.querySelectorAll("aside")[0];
    var aside_bound = document.querySelectorAll("aside")[0].getBoundingClientRect();
    var article_bound = document.querySelectorAll("article")[0].getBoundingClientRect();
    
    aside_node.style.top = Math.max(article_bound.top,0).toString()+'px';
    aside_bound = document.querySelectorAll("aside")[0].getBoundingClientRect();
    article_bound = document.querySelectorAll("article")[0].getBoundingClientRect();
    
    if(aside_bound.bottom > article_bound.bottom){
        aside_node.style.top = (article_bound.bottom-aside_bound.bottom).toString()+'px';
    }
}

function reverse_arrow_icon(close, arrow){
    if (close==1){
         arrow.src = arrow.src.replace("right_arrow.png","left_arrow.png")
        arrow.alt='Left Arrow'
    }
    else if(close==0){
        arrow.src = arrow.src.replace("left_arrow.png","right_arrow.png")
        arrow.alt='Right Arrow'
    }
}
function show_hide_side(){
    var close;
    var side_node = document.querySelectorAll("aside")[0];
    var article_node = document.querySelectorAll("article")[0];
    let arrows = document.querySelectorAll("body > main > aside > img")

    if (arrows[0].src.includes("right_arrow.png")){
        close = 1;
        side_node.classList.add("side-close")
        article_node.classList.add("article-expand");
    }
    else if(arrows[0].src.includes("left_arrow.png")){
        close = 0;
        side_node.classList.remove("side-close")
        article_node.classList.remove("article-expand");
    }
    reverse_arrow_icon(close, arrows[0]);
}
/**
 * 
 * @param {HTMLElement} current_element 
 */
function handle_tap(current_element){
    if(current_element.id=="open-profile"){
        var profile_handler = document.getElementById("profile-handler");
        if(profile_handler.classList.contains("not-used")){
            profile_handler.classList.remove("not-used");
            profile_handler.classList.add("used");
            if(current_user==null){
                //view sign-in and sign-up
                element_handler.remove_children(profile_handler)                
                let sign_in = element_handler.basic("Sign-In", "button","sign-in");
                sign_in.type = 'button';
                sign_in.onclick = ()=> handle_tap(sign_in);
                profile_handler.appendChild(sign_in)

                let sign_up = element_handler.basic("Sign-Up", "button","sign-up");
                sign_up.type = 'button';
                sign_up.onclick = ()=> handle_tap(sign_up);
                profile_handler.appendChild(sign_up)
                
            }else{
                //view profile settengs
                element_handler.remove_children(profile_handler)
                let profile_settings = element_handler.basic("Profile Settings", "button","profile-settings");
                profile_settings.type = 'button';
                profile_settings.onclick = ()=> handle_tap(profile_settings);
                profile_handler.appendChild(profile_settings)

                let log_out = element_handler.basic("Log-Out", "button","log-out");
                log_out.type='button';
                log_out.onclick = ()=>handle_tap(log_out);
                profile_handler.appendChild(log_out);
            }
        }
        else{
            reset();
        }
    }
    else if(current_element.id =="log-out"){
        basic_memory.del_object('current_user');
        current_user = null;
        element_handler.goto_link('Home.html');
    }
    else if(current_element.id =="profile-settings"){
        element_handler.goto_link('Profile.html');
    }
    else if(current_element.id =="open-home"){
        element_handler.goto_link('Home.html');
    }
    else if(current_element.id =="open-tasks"){
        element_handler.goto_link('Tasks.html');
    }
    else if(current_element.id =="sign-in"){
        element_handler.goto_link('Sections/Account/Sign-in.html');
    }
    else if(current_element.id =="sign-up"){
        element_handler.goto_link('Sections/Account/Sign-up.html');
    }
    else if(current_element.id=="Search" || current_element.id == "advanced-search"){
        task_UI.search_task(true);
    }else if(current_element.classList.contains("mark-incompleted-button") || current_element.classList.contains("mark-completed-button")){
        if(current_element.parentElement){
            if(current_element.parentElement.parentElement){
                let this_task = tasks[tasks_handler.search(
                    current_element.parentElement.parentElement.classList.item(1)
                )];
                this_task.completed = !Boolean(this_task.completed);
                tasks_handler.set_task(this_task);
                element_handler.goto_link("Tasks.html")
            }
        }
    }else if(current_element.classList.contains("edit-task")){
        if(current_element.parentElement){
            if(current_element.parentElement.parentElement){
                let this_task = tasks[tasks_handler.search(
                    current_element.parentElement.parentElement.classList.item(1)
                )];
                current_selected_task = this_task;
                basic_memory.set_object("current_selected_task", current_selected_task);
                edit_task_flag = true;
                basic_memory.set_object("edit_task_flag", edit_task_flag);
                element_handler.goto_link("Sections/Tasks/CreateNewTask.html")
            }
        }
    }else if(current_element.classList.contains("delete-task")){
        if(current_element.parentElement){
            if(current_element.parentElement.parentElement){
                let this_task = tasks[tasks_handler.search(
                    current_element.parentElement.parentElement.classList.item(1)
                )];
                tasks_handler.del_task(this_task);
                element_handler.goto_link("Tasks.html")
            }
        }
    }else if(current_element.id=="save-new-task"){
        let newtask = new task(
            document.getElementById("task-id-field").value,
            document.getElementById("TaskTitleInput").value,
            users_handler.search(current_user.username),
        )
        /**@type {[string]} */
        let current_to_users = document.getElementById("teachers").value.replace(" ","").split(',');
        let current_priority = 0;
        if(document.getElementById("low").checked){
            current_priority=1;
        }else if(document.getElementById("medium").checked){
            current_priority=2;
        }else if(document.getElementById("high").checked){
            current_priority=3;
        }
        newtask.priority = current_priority;
        newtask.deadline = new Date(document.getElementById("deadline").value).toISOString();
        newtask.description = document.getElementById("description-field").value;
        if(tasks_handler.search(newtask.id)!=null && !edit_task_flag){
            window.alert("This Task ID is already exists");
        }
        let these_users_indexes = []
        for(let this_user_username of current_to_users){
            let current_result = users_handler.search(this_user_username);
            if(current_result==null){
                window.alert("cannot find this username: "+this_user_username);
                return false;
            }
            these_users_indexes.push(current_result);
        }
        newtask.to_users_indexes = these_users_indexes;
        tasks_handler.set_task(newtask);
        element_handler.goto_link("Tasks.html");
    }
    else if(current_element.id=="create-new-task"){
        edit_task_flag = false;
        basic_memory.set_object("edit_task_flag", edit_task_flag);
        element_handler.goto_link("Sections/Tasks/CreateNewTask.html");
    }
    else{
        reset();
    }
}
// global reset
function reset(){
    let profile_handler = document.getElementById("profile-handler");
    if(profile_handler.classList.contains("used")){
        profile_handler.classList.remove("used");
        profile_handler.classList.add("not-used");
    }
}
// update profile image
function update_profile_image(){
    if(Boolean(current_user)){
        if (Boolean(current_user.profile_image)){
            document.getElementById("open-profile").src = current_user.profile_image;
        }
    }
}
// update website view
function update_website_view(){
    
    if(Boolean(current_user)){
        var main_head = document.querySelector("head");
        var current_user_view = document.getElementById("user-desired-view");
        var css_location = "CSS Source/Templetes/";
        if(Boolean(current_user_view)){
            main_head.removeChild(current_user_view);
        }
        if(recursive){
            css_location = "../../" + css_location
        }
        if (Boolean(current_user.website_view)){
            main_head.appendChild(
                element_handler.stylesheet(css_location+current_user.website_view+".css","user-desired-view")
            )
        }
    }
}
// update section
function pre_body_load(){
    update_website_view();
}
function post_load(){
    update_profile_image();
    window.onscroll = scroll_manager;
}
// test section
function alert_break(){
    window.alert("it is working.");
}