let curWin = "";

let minShrinkHeight = 60;
let prefix = "A club for&nbsp;";
//TODO: get rid of weird glitch when user reloads page
let words = ["", "coders", "innovators", "aspiring developers", "dreamers", "everyone"]; //TODO: maybe make these better
let subPage = "pages/"
window.onload = async () => {
    if(document.location.host.toString().includes("github")){
        subPage = document.location.pathname.toString().split("/")[0]+subPage;
    }
    if(!window.location.hash){
        window.location.hash='home';
    }
    changeTab();
    $(".home").click(changeTab);
    $(window).on('hashchange', changeTab); //TODO: condense this?

    textFit($(".title.main")[0]);
    textFit($("#word")[0]);
    await wait(50);
    $("#word .textFitted").css("width", "auto");
    $("#word .textFitted").css("border-right", "1ch solid rgb(122, 122, 122)");

    $("#close").click(() => {
        $(".window").css("opacity", 0);
        setTimeout(() => {
            $(".window").css("display", "none")
        }, 500);
    });
    $("#about").click(() => {

        $(".window").css("display", "block");
        setTimeout(() => {
            $(".window").css("opacity", 1)
        }, 10);
    });

    $(".tab").hover((el) => {
        updateTabUnderline();
        if (el.type == "mouseenter") {
            el.target.classList.add("active");
        }
    });


    $("#arrow").click(() => {
        $("html, body").animate({ scrollTop: $(window).height() }, "slow");
    });

    $(window).scroll(()=>{
        updateTabs();
        let move = Math.min($(window).height(),$(window).scrollTop());
        $("#splash-background").css("opacity",1-(move/$(window).height()));

        move/=5;

        $("#splash-background").css("transform","translate(0,-"+move+"px)");
    });

    for (let i = 0; ; i = (i + 1) % words.length) {
        let word = words[i];
        for (let j = 0; j <= word.length; j++) {
            $("#word .textFitted").html(prefix + word.substring(0, j));
            await wait(100 * Math.random());
        }
        let int = setInterval(blink, 500);

        await wait(2000);

        clearInterval(int);
        // $("#word").html(" ");
        $("#word .textFitted").css("border-right", "1ch solid rgb(122, 122, 122)");

        for (let j = word.length; j >= 0; j--) {
            $("#word .textFitted").html(prefix + word.substring(0, j));
            await wait(30);
        }
        await wait(500);

    }

}
function updateTabUnderline() {
    $(".tab").removeClass("active");
    $("[href=\"#!" + curWin+"\"]").addClass("active");
}
async function changeTab(){
    let name = window.location.hash.replace("#!","");
    console.log("changing to "+name);
    
    $("#actualContent").load(subPage + name + ".html", coolAnimation);
    curWin = name;
    await wait(100);

    if(name=='home'){
        $(".splash").css("display", "block");
        $("#actualContent").css('margin-top', "100vh");
        $("html, body").animate({ scrollTop: 0 }, "fast"); //TODO: change to 0    
    }else{
        $(".splash").css("display", "none"); 
        $("#actualContent").css('margin-top', minShrinkHeight + 'px');
        $("html, body").animate({ scrollTop: 0 }, 0);    
    }
    updateTabUnderline();
    updateTabs();
}
async function updateTabs() {

    if (getTop("#actualContent") <= getTop(".main") || $(".splash")[0].style.display == "none") {
        if (getTop("#actualContent") <= minShrinkHeight) {
            $(".home").css("font-size", "20px");

            $(".tab").css("opacity", 1);
            $(".tab").css("pointer-events", "all");
            $(".tab").css("font-size", '20px');

            $(".top").css("height", minShrinkHeight + "px");

        } else {
            clear();
        }
        $(".home").css("opacity", 1);
        $(".home").css("pointer-events", "all");

    } else {
        clear();
    }
    $("#about").removeAttr('style');


}
function setUpPage(){
    console.log(window.location.hash);
}
function clear() {
    console.log("clearning");
    $(".tab").css("opacity", 0);
    $(".home").css("opacity", 0);


    $(".tab").removeAttr('style');
    $(".home").removeAttr('style');
    $(".top").removeAttr('style');
}
function blink() {
    if ($("#word .textFitted")[0].style.borderColor != "transparent") {
        $("#word .textFitted").css("border-color", "transparent");
    } else {
        $("#word .textFitted").css("border-color", "rgb(122, 122, 122)");
    }


}
function getTop(identifier) {
    return $(identifier)[0].getBoundingClientRect().top;
}
function getBottom(identifier) {
    return $(identifier)[0].getBoundingClientRect().bottom;
}
async function coolAnimation() {
    $(".container").css("opacity", 0);
    let c = $(".container");
    console.log(c);
    for (let i = 0; i < c.length; i++) {
        await wait(100);

        c[i].style.opacity = 1;
    }
}
function wait(m) {
    return new Promise((re) => {
        setTimeout(re, m);
    });
}