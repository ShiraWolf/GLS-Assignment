const url =
    "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";

const loadJquery = async () =>{
    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    while (typeof window.jQuery === undefined || typeof window.$ ===undefined || typeof $.ajax !== "function"||!window.jQuery){
        await new Promise(r => setTimeout(r, 200));
    }
}

await loadJquery();

loadCSS = function (){
    $("document.createElement(\"link\")", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css"
    }).appendTo("head");
}
loadCSS();
