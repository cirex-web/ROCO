let curWin = "";

let minShrinkHeight = 60;
let prefix = "A club for&nbsp;";
//TODO: All buttons still hoverable even though it's hidden
//TODO: Please enable js
//TODO: set backgrouhd to dispklay none when tab is clicked
//TODO: chang tab color after clicked
//TODO: Cursor disappears after a while
let words = ["","coders", "innovators", "developers", "dreamers", "everyone"]; //TODO: 
window.onload = async () => {

    textFit($(".title.main")[0]);
    textFit($("#word")[0]);
    await wait(50);
    $("#word .textFitted").css("width","auto");
    $("#word .textFitted").css("border-right","1ch solid rgb(122, 122, 122)");
    $("#close").click(()=>{
        $("#aboutWindow").css("opacity",0);
        setTimeout(()=>{
            $("#aboutWindow").css("display","none")
        },500);
    })
    $("#about").click(()=>{
        $("#aboutWindow").css("display","block");
        setTimeout(()=>{
            $("#aboutWindow").css("opacity",1)
        },10);
    })
    $(".tab").click(async (e) => {
        let name = e.target.innerHTML.replace("?", "");
        if (name != curWin) {
            $("#actualContent").load(name + ".html", coolAnimation);
            curWin = name;
            await wait(10);
            $("#actualContent").css('margin-top', minShrinkHeight + 'px'); //TODO: Remove animation for this very blinding
            $("html, body").animate({ scrollTop: 0 }, 0);
        }
    });
    $("#arrow").click(()=>{
        $("html, body").animate({ scrollTop: $(window).height()}, "slow");
    })
    $(".home").click(() => {


        $("#actualContent").load("home.html", coolAnimation);
        $("#actualContent").css('margin-top', "100vh");
        $("html, body").animate({ scrollTop: "0" }, "fast");
        updateTabs();
        curWin = "home";


    });

    $(window).scroll(updateTabs);
    $(".home").click();

    for (let i = 0; ; i = (i + 1) % words.length) {
        let word = words[i];
        for (let j = 0; j <= word.length; j++) {
            $("#word .textFitted").html(prefix+word.substring(0, j));
            await wait(100);
        }
        let int = setInterval(blink, 500);

        await wait(2000);
        
        clearInterval(int);
        // $("#word").html(" ");
        for (let j = word.length; j >= 0; j--) {
            $("#word .textFitted").html(prefix+word.substring(0, j));
            await wait(30);
        }
        await wait(500);

    }

}
function updateTabs() {
    // .removeAttr('style');
    // 70 is hardcoded TODO:
    if (getTop("#actualContent") <= getTop(".main")) {
        if ((dif = getTop("#actualContent")) <= minShrinkHeight) {
            $(".tab").css("opacity", 1);
            $(".tab").css("font-size", '20px');

            $(".home").css("font-size", "20px");
            $(".top").css("height", minShrinkHeight + "px");
        } else {
            clear();
        }
        $(".home").css("opacity", 1);
    } else {
        clear();
        $(".home").css("opacity", 0);
    }
    $("#about").removeAttr('style');


}
function clear() {
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
    $(".container").prop("opacity", 0);
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