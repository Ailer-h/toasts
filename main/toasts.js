function isValidHEX(hex_input){
    return /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(hex_input);
}

function place_toast(toast_id, toast_queue_id, toast_type){

    let queue = document.querySelector('#' + toast_queue_id);

    if(toast_type == "icon"){
        queue.innerHTML += `
            <div class="toast icon" id="${toast_id}">
                <div class="center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#212121"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
                <div>
                    <h1>Common toast</h1>
                    <hr>
                    <p>Toast body</p>
                    <div class="bar"></div>
                </div>
            </div>
        `

    }else if(toast_type == "common"){ 
        queue.innerHTML += `
            <div class="toast" id="${toast_id}">
                <h1>Common toast</h1>
                <hr>
                <p>Toast body</p>
                <div class="bar"></div>
            </div>
        `
    }

}

const std_colors = [
    "warning",
    "danger",
    "success",
    "primary",
    "info"
]

const unities_allowed = ['px', 'em', 'rem', '%'];


class Toast{
    constructor(toast_id){

        this.id = toast_id.charAt(0) == "#" ? toast_id : `#${toast_id}`;

        try{
            this.toast = $(this.id);
        
        }catch(exception){
            throw new Error("Toast not found");
        }

        this.type = this.toast.hasClass("icon") ? "icon" : "common";
        this.bar = this.toast.find(".bar") ? $(this.id + " .bar") : null;

        this.tittle = $(this.id + " h2");
        this.body = $(this.id + " p")
        
    }

    //Toast visibility functions
    hide(){
        this.toast.hide(80);
    }

    async show(hide_timeout){

        if(this.type == "icon"){
            this.toast.css("display", "grid");
        
        }else{
            this.toast.show(200);
        }


        let remainingTime = hide_timeout;
        let timer_interval = 10; //ms

        while(remainingTime > 0){

            if(this.bar){
                let percentage = ((remainingTime / hide_timeout) * 100).toFixed(2) + "%";
                this.bar.css("width", percentage);
            }

            remainingTime -= timer_interval;
            await new Promise(resolve => setTimeout(resolve, timer_interval));
            
        }

        this.hide();

    }

    //Toast content functions
    setTittle(tittle){
        tittle = tittle.toString();
        this.tittle = tittle;
    }

    setBody(body){
        body = body.toString();
        this.body = body;
    }

    setContents(tittle, body){
       this.setTittle(tittle);
       this.setBody(body);
    }

    //Toast dimensions functions
    setHeight(height, unity){

        height = height.toString();
        unity = unity.toString();

        unity = unities_allowed.includes(unity) ? unity : "px";

        this.toast.css("height", `${height}${unity}`);
    }

    setWidth(width, unity){

        width = width.toString();
        unity = unity.toString();

        unity = unities_allowed.includes(unity) ? unity : "px";

        this.toast.css("width", `${width}${unity}`);
    }

    setBarHeight(BarHeight, barUnity){

        BarHeight = BarHeight.toString();
        barUnity = barUnity.toString();

        $(this.id + " .bar").css("height", `${BarHeight}${barUnity}`);
    }

    //Toast colour function
    setBgColor(bgColor){

        bgColor = bgColor.toString().toLowerCase();

        if(!std_colors.includes(bgColor) && !isValidHEX(bgColor)){
            return;
        }

        if(std_colors.includes(bgColor)){
            this.toast.addClass(bgColor);
        }

        this.toast.css("background-color", bgColor);
    }

    setBarColor(barColor){
        barColor = barColor.toString().toLowerCase();

        if(!isValidHEX(barColor)){
            return;
        }

        this.bar.css("background-color", barColor);
    }
}