let curWin = "";

let minShrinkHeight = 60;
let prefix = "A club for&nbsp;";

let words = ["", "coders", "innovators", "aspiring developers", "dreamers", "everyone"]; //TODO: maybe make these better
let subPage = "pages/";
let nextContainer = 0;
$(document).ready(async () => {
    if (document.location.host.toString().includes("github")) {
        subPage = document.location.pathname.toString().split("/")[0] + subPage;
    }
    if (!window.location.hash) {
        window.location.hash = '!home';
    }
    changeTab();
    $(".home").click(changeTab);
    $(window).on('hashchange', changeTab); 
    
    textFit($(".title.main")[0]);
    textFit($("#word")[0]);
    await wait(50);
    $("#word .textFitted").css("width", "auto");
    $("#word .textFitted").css("border-right", "1ch solid rgb(122, 122, 122)");

    $(".splash-text").css("opacity",1);
    $(".splash-text").css("transform","none");

    $(window).scroll(() => {
        adjustToScroll($(window).scrollTop() + $(window).height()>=$(document).height()-20);
        console.log($(window).scrollTop() + $(window).height(),$(document).height()-20);
        // move /= 5;
        // $("#splash-background").css("transform", "translate(0,-" + move + "px)");
    });

    configureMouseActions();
    beginText();

});
function adjustToScroll(bottom){

    updateTabs();
    let move = Math.min($(window).height(), $(window).scrollTop());
    let opacity = 1 - (move / $(window).height());
    $("#splash-background").css("opacity", opacity);
    $(".textFitted").css("opacity",opacity);

    if(nextContainer!=-1&&(bottom||getTop(".container",nextContainer)<=.75*$(window).height())){
        showContainer(nextContainer);
        nextContainer++;
        if(nextContainer==$(".container").length){
            nextContainer = -1;
        }
        adjustToScroll(bottom);
    }
}
async function beginText(){
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
function configureMouseActions(){
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

}
function updateTabUnderline() {
    $(".tab").removeClass("active");
    $("[href=\"#!" + curWin + "\"]").addClass("active");
}
async function changeTab() {
    nextContainer = 0;
    let name = window.location.hash.replace("#!", "");
    // console.log("changing to " + name);
    // console.log(subPage + name + ".html");
    $("#actual-content").load(subPage + name + ".html");
    curWin = name;
    await wait(100);

    if (name == 'home') {
        $(".splash").css("display", "block");
        $("#actual-content").css('margin-top', "100vh");
        $("html, body").animate({ scrollTop: 0 }, "fast");    
    } else {
        $(".splash").css("display", "none");
        $("#actual-content").css('margin-top', minShrinkHeight + 'px');
        $("html, body").animate({ scrollTop: 0 }, 0);
    }
    updateTabUnderline();
    adjustToScroll();
}
async function updateTabs() {
    if (getTop("#actual-content") <= getTop(".main") || $(".splash")[0].style.display == "none") {
        if (getTop("#actual-content") <= minShrinkHeight) {
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

function clear() {
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
function getTop(identifier, i=0) {
    return $(identifier)[i]?$(identifier)[i].getBoundingClientRect().top:undefined;
}

async function showContainer(i) {
    $(".container")[i].classList.add("show");
}
function wait(m) {
    return new Promise((re) => {
        setTimeout(re, m);
    });
}