const url =
    "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

async function loadJquery() {
    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    while (typeof window.jQuery === undefined || typeof window.$ === undefined || typeof $.ajax !== "function"||!(window.$)) {
        await new Promise(r => setTimeout(r, 300));
    }
}
    console.log('before start');
    await loadJquery();
    console.log('after start');

let loadStyle = function(url) {
    // injecting css
    let styleTag = document.createElement('link');
    // Add attributes
    styleTag.rel = 'stylesheet';
    styleTag.href = url;
    // Attach to the document head
    document.head.appendChild(styleTag);
    console.log("CSS loaded successfully!")
};

loadStyle("https://guidedlearning.oracle.com/player/latest/static/css/stTip.css");



//creating a tip content based on content and id and adding the correct css based on the json file
const setTipContent =(content, id,toolCSS,tooltip) => {
    $("head").append('<style>'+toolCSS+'</style>')
    return `<div id="x_${id}">
    <div  class="sttip">
     <div class="tooltip in">
           <div class="tooltip-arrow">  
            </div>
           <div class="tooltip-arrow second-arrow">          
            </div>
           <div class="popover-inner">
           ${content}
           ${tooltip}
           </div>
             </div>
           </div>`
};
//injected setTipContent to html
const runJsonFile  = () =>{
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function (res){
            const resData = res.data;
            const steps = res.data.structure.steps;
            for (let i=0; i < steps.length;i++){
                const currID = steps[i].id
                if (steps[i].action.type=== "tip"){
                    // const next = steps[i].followers[0].next
                    const currContent = steps[i].action.contents["#content"]
                    const html = setTipContent(currContent,currID,resData.css,resData.tiplates.tip);
                    const divElement = document.createElement('div');
                    divElement.innerHTML = html;
                    document.body.append(divElement);
                }
            }
        },
        error:function (){
            console.log("error")
        }
    })
}
runJsonFile();
