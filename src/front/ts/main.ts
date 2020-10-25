/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
//Ejercicio 9
interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:number;
    type:number;
}

//global var
var geturl:string;
var posturl:string;

class Main implements EventListenerObject , GETResponseListener, POSTResponseListener{
    framework:MyFramework = new MyFramework();
    view:ViewMainPage;
    vConfig:ViewConfigPage;
    counter:number = 0;
    main():void{

        console.log("soy un mensaje");
        let users:Array<User>;
        users = new Array<User>();
        users.push(new User(1, "Agustin", "agustin@gmail.com"));
        users.push(new User(2, "Carlos", "Carlos@gmail.com"));
        users.push(new User(3, "Javier", "javier@gmail.com"));

        for(let i in users)
        {
            users[i].printinfo();
        }

        //Ejercicio 4
        this.mostrarUsers(users);

        this.framework.requestGET("/devices/",this);

        this.view = new ViewMainPage(this.framework);

        //Trabajo final
        this.vConfig = new ViewConfigPage(this.framework);
        let configclick:HTMLElement = this.framework.getElementById("configbutton");
        configclick.addEventListener("click",this);
        let devclick:HTMLElement = this.framework.getElementById("dispbutton");
        devclick.addEventListener("click",this);

    }
    //Ejercicio 4
    mostrarUsers(usuarios:Array<User>):void{
        for(let i in usuarios)
        {
            usuarios[i].printinfo();
        }
    }

    //Ejercicio 6 y 7
    handleEvent(evt : Event):void{
        console.log(`se hizo "${evt.type}"`);

        
        let b:HTMLElement = this.framework.getElementByEvent(evt);
        console.log(b);
        //Trabajo final
        if(b.id == "configbutton")
        {
            console.log("Se clickeo configuración.")
            this.vConfig.showConfiguration();
            let sdbutton = this.framework.getElementById("sdbutton");
            sdbutton.addEventListener("click",this);
            let addbutton = this.framework.getElementById("addbutton");
            addbutton.addEventListener("click",this);
            let removebutton = this.framework.getElementById("removebutton");
            removebutton.addEventListener("click",this);
        }
        else if(b.id == "sdbutton")
        {
            let data = {};
            this.framework.requestPOST("/apagar/",data,this);
        }
        else if(b.id == "addbutton")
        {
            this.vConfig.showAddForm();
        }
        else if(b.id == "removebutton")
        {
            geturl = "/devices/";
            this.framework.requestGET(geturl,this);
            //this.vConfig.showRmForm();
        }
        else if(b.id == "dispbutton")
        {
            this.framework.requestGET("/devices/",this);
        }
        else if(b.id.includes("dev"))
        {
            let state: boolean = this.view.getSwitchStateById(b.id);
            let stateP = state==true ? 1 : 0; 
            let idtoint = b.id.slice(4);
            let data = {"id": `${parseInt(idtoint)}`, "state":stateP};
            this.framework.requestPOST("/modstate/", data, this);
        }
        else if(b.id.includes("modb"))
        {
            let modbtoint = b.id.slice(5);
            this.view.showModForm(parseInt(modbtoint));
        }
        else
        {
            posturl = "/rmform/";
            let data = {"rmform_id": `${parseInt(b.id)}`};
            this.framework.requestPOST(posturl,data,this);
        }
        
    }


    //Ejercicio 8
    handleGETResponse(status:number, response: string):void{
        if(geturl == "/devices/"){
            console.log("Respuesta: " + response);
            let data:DeviceInt[] = JSON.parse(response);
            this.vConfig.showRmForm(data);
            for(let dev of data)
            {
                let disp:HTMLElement = this.framework.getElementById(dev.id);
                disp.addEventListener("click",this);
            }
        }
        else{
            console.log("Respuesta: " + response);

            let data:DeviceInt[] = JSON.parse(response);
            console.log(data);
    
            this.view.showDevices(data);
    
            for(let d of data)
            {
               let b:HTMLElement = this.framework.getElementById(`dev_${d.id}`);
               let modb:HTMLElement = this.framework.getElementById(`modb_${d.id}`);
               b.addEventListener("click",this);
               modb.addEventListener("click",this);
            }
        }
    }

    //Ejercicio 12

    handlePOSTResponse(status:number, response: string):void{
       if(posturl == "/rmform/"){
           location.reload();
       }
        console.log("Respuesta POST " + response);
    }
    
    
}


window.onload = function(){
    let n:Main = new Main();
    n.main();
}
//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

function greeter(person) {
    return "Hello, " + person;
 }
 
// document.body.innerHTML = greeter(user);

console.log("Hola mundo");
//=======[ End of file ]=======================================================
