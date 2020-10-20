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

        let boton:HTMLElement = this.framework.getElementById("boton");
        boton.textContent = "Boton";
        boton.addEventListener("click",this);

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
            let data = {"apagar": 1};
            this.framework.requestPOST("/apagar/",data,this);
        }
        else if(b.id == "addbutton")
        {
            this.vConfig.showAddForm();
        }
        else if(b.id == "removebutton")
        {
            this.vConfig.showRmForm();
        }
        else if(b.id == "dispbutton")
        {
            this.framework.requestGET("/devices/",this);
        }
        //
        else if(b.id == "boton")
        {
            this.counter++;
            b.textContent = `Click ${this.counter}`;
        }
        else
        {
            let state: boolean = this.view.getSwitchStateById(b.id);
            let stateP = state==true ? 1 : 0; 
            let idToInt = b.id.slice(4);
            let data = {"id": `${parseInt(idToInt)}`, "state":stateP};
            this.framework.requestPOST("/modstate/", data, this);
        }
        
        
    }

    //Ejercicio 8
    handleGETResponse(status:number, response: string):void{
        console.log("Respuesta: " + response);

        let data:DeviceInt[] = JSON.parse(response);
        console.log(data);

        this.view.showDevices(data);

        for(let d of data)
        {
           let b:HTMLElement = this.framework.getElementById(`dev_${d.id}`);
           b.addEventListener("click",this);
        }
    }

    //Ejercicio 12

    handlePOSTResponse(status:number, response: string):void{
       // console.log(status);
        console.log("Respuesta POST " + response);
       //let dataPost:DeviceInt[] = JSON.parse(response);
       
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
