function profile_handle_buttons(current_element){
    if(current_element.id=="save"){
        var full_name = element_handler.get_id("full-name");
        var email = element_handler.get_id("email");
        var birth_date = element_handler.get_id("birth-date");
        var address =  element_handler.get_id("address");
        var department = element_handler.get_id("department");
        var is_admin = element_handler.get_id("is_admin");
        var profile_image = element_handler.get_id("profile_image");
        current_user.full_name = full_name.value;
        current_user.email = email.value;
        current_user.birth_date = birth_date.value;
        current_user.address = address.value;
        current_user.department = department.value;
        current_user.is_admin = is_admin.value;
        current_user.profile_image = profile_image.value;
        
        users_handler.set_user(current_user);
    }else if(current_element.id=="cancel"){
        element_handler.goto_link("Profile.html");
    }
    else if(current_element.id=="change-password"){
        element_handler.goto_link("ChangePassword.html");
    }
    else if(current_element.id=="save-password"){
        var oldPassword = element_handler.get_id("your-old-password");
        var newPassword = element_handler.get_id("new-password");
        var confirmPassword = element_handler.get_id("confirm-password");
        if(current_user.password==oldPassword.value){
            if(newPassword.value==confirmPassword.value){
                current_user.password = newPassword.value;
                users_handler.set_user(current_user);
                element_handler.goto_link("Profile.html")
            }
            else{
                alert("The confirmation of the new password is wrong. check it carefully.")
            }
        }else{
            window.alert("wrong old password");
        }
    }
    else if(current_element.id == "sign-in-button"){
        var username = element_handler.get_id("user-name");
        var password = element_handler.get_id("password");
        var userIndex = users_handler.search(username.value);
        if (userIndex==null){
            window.alert("Wrong Username or Password");
        }
        else if(users[userIndex].password==password.value){
            current_user = users[userIndex];
            basic_memory.set_object("current_user",current_user);
            element_handler.goto_link('Home.html');
        }
        else{
            window.alert("Wrong Username or Password");
        }
    }
    else if(current_element.id=="sign-up-button"){
        var current_user_name = element_handler.get_id("user-name");
        var password = element_handler.get_id("password");
        var full_name = element_handler.get_id("full-name");
        var email = element_handler.get_id("email");
        var birth_date = element_handler.get_id("birth-date");
        var address =  element_handler.get_id("address");
        var department = element_handler.get_id("department");
        var is_admin = element_handler.get_id("is_admin");
        current_user = new user();
        current_user.username = current_user_name.value;
        current_user.password = password.value;
        current_user.full_name = full_name.value;
        current_user.email = email.value;
        current_user.birth_date = birth_date.value;
        current_user.address = address.value;
        current_user.department = department.value;
        current_user.is_admin = is_admin.value;
        if (users_handler.search(current_user_name.value)!=null){
            window.alert("This username is already taken.")
        }
        else{
            users_handler.set_user(current_user);
            basic_memory.set_object("current_user",current_user);
            element_handler.goto_link("Home.html")
        }
    }
}
function current_data(){
    var full_name = element_handler.get_id("full-name");
    var email = element_handler.get_id("email");
    var birth_date = element_handler.get_id("birth-date");
    var address =  element_handler.get_id("address");
    var department = element_handler.get_id("department");
    var is_admin = element_handler.get_id("is_admin");
    var profile_image = element_handler.get_id("profile_image");
    full_name.value = current_user.full_name;
    email.value = current_user.email;
    birth_date.value = current_user.birth_date;
    address.value = current_user.address;
    department.value = current_user.department;
    is_admin.value = current_user.is_admin;
    profile_image.value = current_user.profile_image;
}
