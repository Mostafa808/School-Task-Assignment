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
     */
    constructor(username, full_name, email, address, department, birth_date, profile_image, password, is_admin){
        this.username = username;
        this.full_name = full_name;
        this.email = email;
        this.address = address;
        this.department = department;
        this.birth_date = birth_date;
        this.profile_image = profile_image;
        this.password = password;
        this.is_admin = is_admin;
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
        elem.textContent = content;
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
    static set_user(newuser){
        var exists = this.search(newuser.id);
        if (exists!=null){
            users[exists] = newuser;
        }
        users.push(newuser);
        this.save_users();
    }
    static del_user(oldUser){
        var exists = this.search(oldUser.id);
        if (exists!=null){
            users.splice(exists,1);
            this.save_users();
        }

    }
    static save_users(){
        basic_memory.set_object("users", users)
    }
    static search(username){
        var index = 0;
        for(let user of users){
            if(user.username==username){
                return index;
            }
            index+=1;
        }
        return null;
    }
}
// global settings
var recursive = false;
//memory model
/** @type {user} */
var current_user = basic_memory.get_object("current_user");
// global users
/**@type {[]} */
var users = basic_memory.get_object("users");
// test user
// var current_user = new user("mos","mostafa","gmail.com",'Gize',"social",'22/1/2004','https://th.bing.com/th/id/R.3d88a927f8529dcba03364b09d98adbe?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0','m512',true)
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
    else{
        reset();
    }
}
// global reset
function reset(){
    var profile_handler = document.getElementById("profile-handler");
    if(profile_handler.classList.contains("used")){
        profile_handler.classList.remove("used");
        profile_handler.classList.add("not-used");
    }
}
// update section
window.onscroll = scroll_manager;