function profile_handle_buttons(current_element){
    if(current_element.id=="save"){
        var full_name = element_handler.get_id("full-name");
        var email = element_handler.get_id("email");
        var birth_date = element_handler.get_id("birth-date");
        var address =  element_handler.get_id("address");
        var department = element_handler.get_id("department");
        var is_admin = element_handler.get_id("is_admin");
        var profile_image = element_handler.get_id("profile-image");
        var website_view = element_handler.get_id("website-view");
        if(Boolean(full_name.value)) current_user.full_name = full_name.value;
        if(Boolean(email.value)) current_user.email = email.value;
        if(Boolean(birth_date.value)) current_user.birth_date = birth_date.value;
        if(Boolean(address.value)) current_user.address = address.value;
        if(Boolean(department.value)) current_user.department = department.value;
        if(Boolean(is_admin.value)) current_user.is_admin = is_admin.value;
        if(Boolean(profile_image.value)) current_user.profile_image = profile_image.value;
        
        current_user.website_view = website_view.value;
    
        
        users_handler.set_user(current_user, true);
        element_handler.goto_link("Profile.html");

    }else if(current_element.id=="cancel"){
        element_handler.goto_link("Profile.html");
    }
    else if(current_element.id=="change-password"){
        element_handler.goto_link("Sections/Account/ChangePassword.html");
    }
    else if(current_element.id=="save-password"){
        var oldPassword = element_handler.get_id("your-old-password");
        var newPassword = element_handler.get_id("new-password");
        var confirmPassword = element_handler.get_id("confirm-password");
        if(current_user.password==oldPassword.value){
            if(newPassword.value==confirmPassword.value){
                current_user.password = newPassword.value;
                users_handler.set_user(current_user, true);
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
        if(!form_handler.validate_fields([username, password],
            ["username","password"])){
                return false;
        }
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
    else if(current_element.id == "create-account"){
        element_handler.goto_link("Sections/Account/Sign-up.html");
    }
    else if(current_element.id == "have-account"){
        element_handler.goto_link("Sections/Account/Sign-in.html");
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
        if(!form_handler.validate_fields([current_user_name, password, full_name, email, birth_date, address, department, is_admin],
            ["username","password","full name", "email", "birth date", "address", "department", "is admin"])){
                return false;
        }

        current_user = new user();
        if(Boolean(current_user_name.value)) current_user.username = current_user_name.value;
        if(Boolean(password.value)) current_user.password = password.value;
        if(Boolean(full_name.value)) current_user.full_name = full_name.value;
        if(Boolean(email.value)) current_user.email = email.value;
        if(Boolean(birth_date.value)) current_user.birth_date = birth_date.value;
        if(Boolean(address.value)) current_user.address = address.value;
        if(Boolean(department.value)) current_user.department = department.value;
        if(Boolean(is_admin.value)) current_user.is_admin = is_admin.checked;
        
        if (users_handler.search(current_user_name.value)!=null){
            window.alert("This username is already taken.")
        }
        else{
            users_handler.set_user(current_user, true);
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
    var profile_image = element_handler.get_id("profile-image");
    var website_view = element_handler.get_id("website-view");

    if(Boolean(current_user.full_name)) full_name.placeholder = current_user.full_name;
    if(Boolean(current_user.email)) email.placeholder = current_user.email;
    if(Boolean(current_user.birth_date)) birth_date.value = current_user.birth_date;
    if(Boolean(current_user.address)) address.placeholder = current_user.address;
    if(Boolean(current_user.department)) department.value = current_user.department;
    if(Boolean(current_user.is_admin)) is_admin.checked = current_user.is_admin;
    if(Boolean(current_user.profile_image)) profile_image.placeholder = current_user.profile_image;
    if(Boolean(current_user.website_view)) website_view.value = current_user.website_view;
}
