const url =
    "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

async function loadJquery() {
    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    while (typeof window.jQuery === undefined || typeof window.$ === undefined || typeof $.ajax !== "function"||!(window.$)) {
        await new Promise(r => setTimeout(r, 1000));
    }
}

(async() => {
    console.log('before start');

    await loadJquery();

    console.log('after start');
})();

let loadStyle = function(url) {
    return new Promise((resolve, reject) => {
        let link    = document.createElement('link');
        link.type   = 'text/css';
        link.rel    = 'stylesheet';
        link.onload = () => { resolve(); console.log('style has loaded'); };
        link.href   = url;

        let headScript = document.querySelector('script');
        headScript.parentNode.insertBefore(link, headScript);
    });
};

await loadStyle("https://guidedlearning.oracle.com/player/latest/static/css/stTip.css");



//creating a tip content based on content and id
const setTipContent =(content, id) => {
    return `<div class="sttip" id="x_${id}" style="position: absolute;" xmlns="http://www.w3.org/1999/html">
    <div  class="sttip">
     <div class="tooltip in">
           <div class="tooltip-arrow">  <button onclick="prevTool(${id})" style="font-size: medium;background-color: azure"> < </button> </div>
           <div class="tooltip-arrow second-arrow">           <button onclick="nextTool(${id})" style="font-size: medium;background-color: azure"> > </button> </div>
           <div class="popover-inner" id="closing_${id}" style="animation: ease-out; background-color: darkcyan; font-size: large">
           ${content}
           <button onclick="closerTool(${id})" style="font-size: medium;background-color: azure">X</button>
                </div>
             </div>
           </div>`
};


function prevTool(id){
    if (id !== 0) {
        $("#tooltip-arrow_" + id).prev(id);
        $("#tooltip-arrow_" + id).hide();
    }
}

function nextTool(id){
    if (id !== 5) {
        $("#tooltip-arrow_" + id).next(id);
        $("#tooltip-arrow_" + id).hide();
    }
}

//closes tooltips using button on each of them
const closerTool = (id) =>{
    $("#closeing_" + id).hide();
};

//placing content based on location
const placeTipLocation = (content) => {
    if (content.contains("Welcome")){
        $(content).css({"margin-top":"auto","display":"flex","flex-direction":"column","align-items":"center"})
    }
    else if(content.contains("Image")){
        $(content).css({"float":"right","display": "flex"})
    }
    else if (content.contains("Enter")){
        $(content).css({"margin":"0 auto","display": "block","height":"70px","padding-top":"18px"})
    }
    else if(content.contains("to search")){
        $(content).css({"margin":"0 auto","display": "block"})
    }
}

const runJsonFile  = () =>{
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (res){
            const steps = res.data.structure.steps;
            console.log(steps)
        },
        error:function (XMLHttpRequest,textStatus,errorThrown){
            console.log("error")
        }
    })
}
runJsonFile();
