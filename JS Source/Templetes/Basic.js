window.onscroll = scroll_manager;

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

