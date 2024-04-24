if(current_user==null){
    window.alert("You need to sign In first.");
    
}
else if(current_user.is_admin){
    element_handler.goto_link("Sections/Tasks/ViewTaskAdmin.html")
}
else{
    element_handler.goto_link("Sections/Tasks/ViewTaskTeacher.html")
}