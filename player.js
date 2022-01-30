const url =
    "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867"
let currStep = 1;
let steps;

async function loadJquery() {
    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    while (typeof window.jQuery === undefined || typeof window.$ === undefined || typeof $.ajax !== "function"||!(window.$)) {
        await new Promise(r => setTimeout(r, 3000));
    }
}

let loadStyle = function(url) {
    let styleTag = document.createElement('link');
    styleTag.rel = 'stylesheet';
    styleTag.href = url;
    document.head.appendChild(styleTag);
};
//style='position:fixed; top: 50px; left: 50px'
// style='display: flex; position: absolute; align-items: center'
//creating a tip based on tip css
const setTipTool =(toolCSS,tooltip) => {
    $("head").append('<style>'+toolCSS+'</style>')
    $(document.body).append(
        "<div  class='sttip'> " +
        "<div class='tooltip in'> " +
        "<div class='tooltip-arrow'></div>" +
        "<div class='tooltip-arrow second-arrow'></div>" +
        "<div class='popover-inner'>" +
        tooltip +
        "</div>" +
        "</div>" +
        "</div>"
    );
    $("span[class=powered-by]").text("Powered by\nOracle");
    $("button[data-iridize-role='laterBt']").click(closeBtn)
    $("button[data-iridize-role='closeBt']").css({"padding": '0px 25px'}).click(closeBtn);
    $("a[data-iridize-role='nextBt']").click(nextBt);
    $("button[data-iridize-role='prevBt']").click(prevBt).css({"padding": '0px 15px'});
    toolTipContent();
};

function closeBtn(){
    $('.sttip').hide();
}

function nextBt(){
    ++currStep;
    toolTipContent();
    if (currStep > 1){
        $("button[data-iridize-role='prevBt']").removeClass('default-prev-btn');
    }
    if (currStep === steps.length-1){
        $("a[data-iridize-role='nextBt']").hide();
    }
}

function prevBt(){
    --currStep;
    if (currStep === 1){
        $("button[data-iridize-role='prevBt']").addClass('default-prev-btn');
    }
    if(currStep<steps.length){
        $("a[data-iridize-role='nextBt']").css({display: 'block'})//in order to return the next button
    }
    toolTipContent();
}

//changing content based on tip and currStep
function toolTipContent(){
    $("span[data-iridize-role='stepCount']").text(currStep+" /"+(steps.length-1));
    const action = steps[currStep-1].action
    let content;
    if (action.type === "tip"){
        content = action.contents["#content"];
        locationTip();
    }
    else{
        $('.sttip').remove();
    }
    $("div[data-iridize-id='content']").html(content);
}

function locationTip(){
    const action = steps[currStep-1].action
    let content = action.contents["#content"];
    $("sttip">"popover-inner").css({"position": "absolute","top":"50px","right":"20px"})
    if (content.includes("Welcome")){
        console.log("welcome")
        $(`#x_${steps[currStep-1].id}`).css({
            position: "absolute",
            display: "block",
            bottom: '',
            right: 300,
            top: 70
        })
    }
    else if(content.includes("Image")){
        console.log("img")
        $(content).css({"position": "absolute","top":"50px","right":"20px"})
    }
    else if (content.includes("Enter")){
        console.log("ent")
        $(content).css({"margin":"0 auto","display": "block","height":"70px","padding-top":"18px"})
    }
    else if(content.includes("to search")){
        console.log("sr")
        $(content).css({"margin":"0 auto","display": "block"})
    }


}

//injected setTipContent to html
const runJsonFile  = () =>{
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (res){
            const resData = res.data;
            steps = res.data.structure.steps;
            setTipTool(resData.css,resData.tiplates.tip,steps);
        },
        error:function (){
            console.log("error")
        }
    })
}

async function main(){
    console.log('before start');
    await loadJquery();
    console.log('after start');
    loadStyle("https://guidedlearning.oracle.com/player/latest/static/css/stTip.css");
    runJsonFile();
}
await main();