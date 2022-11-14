email = localStorage.getItem('uname')
pass = localStorage.getItem('pwd')
let did_list = []
let did_name = []

async function btn_toggle(clicked_id){
    a = clicked_id.split(" ")[1]
    // console.log(a)
    t_state = document.getElementById(clicked_id).checked
    // console.log(t_state)
    
    url = "https://switch.aakashsingh.tech/toggle/"+a+"/"+t_state+"/"+email+"/"+pass
    try{
        await fetch(url,{method:"POST"})
        .then((response) => {
            // return response.json()
        })
        .then((data) => {
            console.log(clicked_id, t_state)
        })
    }
    catch(error){
        console.log(error)
    }
}

 // global
window.onload = async function get_btn(){
    console.log('running get_btn func');
    const url = 'https://switch.aakashsingh.tech/getdevices'+"/"+email+"/"+pass;
    await fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data)=>{
        var wrapper = document.getElementById('devices')
        var list_wrapper = document.getElementById('devices-list')
        var len = data.response.length;
        // console.log(len)
        for (let i=0;i<len;i++){
            var did_value = data.response[i]['name'].trim();   // needs to be in specific format
            var status = data.response[i]['online'];
            var switch_status = data.response[i]["params"]["switch"]
            // console.log(did_value, switch_status)
            var deviceid = data.response[i]['deviceid']
            did_list.push(deviceid)
            did_name.push(did_value)
            var html = ''
            var droplist_html = ''
            // text box droplist
            droplist_html+='<option>'+did_value+'</option>'
            list_wrapper.innerHTML+=droplist_html

            if (status==true){
                html+='<div class="col-6 col-lg-4 '+ did_value +'" id="'+deviceid+'"><div style="border-radius: 15px;"class="card"><div class="card-body"><div class="row"><div class="col-6">';
                html+='<i style="font-size: calc(0.75em + 7vmin); color: rgb(211, 226, 2);" class="bi bi-lightbulb-fill '+deviceid+'"></i>';
                html+='</div><div class="mt-2 col-6 d-flex justify-content-end"><div style="font-size: calc(0.75em + 3vmin);" class="form-check form-switch">';
                if (switch_status == 'on'){
                    html+='<input class="form-check-input" type="checkbox" onclick=btn_toggle(this.id) id="flexSwitchCheckDefault '+deviceid
                    html+='" checked><label class="form-check-label" for="flexSwitchCheckDefault ' + deviceid + '"></label>';
                }
                else{
                    html+='<input class="form-check-input" type="checkbox" onclick=btn_toggle(this.id) id="flexSwitchCheckDefault '+deviceid
                    html+='"><label class="form-check-label" for="flexSwitchCheckDefault ' + deviceid + '"></label>';
                }
                html+='</div></div></div><h6>'+did_value+'</h6><h6 class="device-state">Status: Online</h6>';
                html+='</div></div></div>'
                wrapper.innerHTML+=html
        }
            else{
                html+='<div class="col-6 col-lg-4 '+ did_value +'" id="'+deviceid+'"><div style="border-radius: 15px;"class="card"><div class="card-body"><div class="row"><div class="col-6">'
                html+='<i style="font-size: calc(0.75em + 7vmin); color: rgb(128, 128, 128);" class="bi bi-lightbulb-fill '+deviceid+'"></i>'
                html+='</div><div class="mt-2 col-6 d-flex justify-content-end"><div style="font-size: calc(0.75em + 3vmin);" class="form-check form-switch">'
                html+='<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault '+deviceid+'" disabled>'
                html+='<label class="form-check-label" for="flexSwitchCheckDefault ' +deviceid+'"></label></div></div></div><h6>'+did_value+'</h6><h6 class="device-state">Status: Offline</h6>'
                html+='</div></div></div>'
                wrapper.innerHTML+=html
            }
        }
    })
}

function update_btn(){
    console.log("running update func")
    // console.log(document.getElementById(v))
    url = 'https://switch.aakashsingh.tech/getdevices/state'+"/"+email+"/"+pass;
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
            for (let i=0; i<data.response.length; i++){
                var curr_state = data.response[i]["params"]["switch"];
                var status = data.response[i]['online'];
                var id = data.response[i]['deviceid']
                // console.log(id,curr_state)
                if(status==true){
                    if(curr_state=='on'){
                        try{
                            ele = document.getElementById('flexSwitchCheckDefault '+id)
                            ele.disabled=false
                            ele.checked=true
                            ele = document.getElementById(id).getElementsByTagName('h6')[1]
                            ele.innerText = "Status: Online"
                            bulb = document.getElementsByClassName('bi bi-lightbulb-fill '+id)
                            bulb=bulb[0].setAttribute('style','font-size: calc(0.75em + 7vmin); color: rgb(211, 226, 2)')
                        }
                        
                        catch(error){
                        console.log(error)}
                    }
                    else{
                        try{
                            ele = document.getElementById('flexSwitchCheckDefault '+id)
                            ele.disabled=false
                            ele.checked=false
                            ele = document.getElementById(id).getElementsByTagName('h6')[1]
                            ele.innerText = "Status: Online"
                            bulb = document.getElementsByClassName('bi bi-lightbulb-fill '+id)
                            bulb=bulb[0].setAttribute('style','font-size: calc(0.75em + 7vmin); color: rgb(211, 226, 2)')
                        }

                        catch(error){
                        console.log(error)
                    }
                    }     
                }
                else{
                    try{
                    // change state to offline i.e disabled
                    ele = document.getElementById('flexSwitchCheckDefault '+id)
                        ele.disabled = true
                        ele.checked = false
                        ele = document.getElementById(id).getElementsByTagName('h6')[1]
                        ele.innerText = "Status: Offline"
                        bulb = document.getElementsByClassName('bi bi-lightbulb-fill '+id)
                        bulb=bulb[0].setAttribute('style','font-size: calc(0.75em + 7vmin); color: rgb(128, 128, 128)')
                    }
                    catch(error){
                        console.log(error)
                    }
                }
            }
    })
}

// search-box logic
function search_filter(clicked_id){
    var search_element = document.getElementById(clicked_id).value
    // console.log(search_element)
    var element = document.getElementsByClassName(search_element)[0]
    for(let i=0;i<did_name.length;i++){
        x = document.getElementById(did_list[i])
        if(search_element == did_name[i]){
           x.style.display="block"
        }
        else if(search_element==""){
            x.style.display="block"
        }
        else{
            x.style.display="none"
        }
    } 
}

// device state
// online/offline
function device_state(clicked){
    var x = document.getElementById(clicked)
    var x = x.options[x.selectedIndex].value
    // console.log(x)
    for(let i=0;i<did_list.length;i++){
        y = document.getElementById('flexSwitchCheckDefault '+did_list[i])
        if(x=='Offline'){
            if(y.disabled==true){
                z = document.getElementById(did_list[i])
                z.style.display = 'block'
            }
            else{
                z = document.getElementById(did_list[i])
                z.style.display='none'
            }
        }
        
        if(x=='Online'){
            if(y.disabled==false){
                z = document.getElementById(did_list[i])
                z.style.display = 'block'
            }
            else{
                z = document.getElementById(did_list[i])
                z.style.display='none'
            }
        }
    }
}


// power state
// on/off
function power_state(clicked){
    var x = document.getElementById(clicked)
    var x = x.options[x.selectedIndex].value
    for(let i=0; i<did_list.length;i++){
        var y = document.getElementById('flexSwitchCheckDefault '+did_list[i])
        if(x=='true'){
            if(y.checked == true){
                z = document.getElementById(did_list[i])
                z.style.display = 'block'
            }
            else{
                z = document.getElementById(did_list[i])
                z.style.display = 'none'
            }
        }
        
        if(x=='false'){
            z = document.getElementById(did_list[i])
            z.style.display = 'block'
            if(y.checked == false && y.disabled == false){
                z = document.getElementById(did_list[i])
                z.style.display = 'block'
            }
            else{
                z = document.getElementById(did_list[i])
                z.style.display = 'none'
            }
        }
    }
}

setInterval(() => {
    update_btn()
}, 5000);