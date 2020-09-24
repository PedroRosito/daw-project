/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
class MyFramework {
    getElementById(id:string):HTMLElement{
        return document.getElementById(id);
    }
}


class Main {
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

        let framework = new MyFramework();
        let boton = framework.getElementById("boton");
        boton.textContent = "Negar";
        //Ejercicio 5
        boton.addEventListener("click", this.evento);
    }
    //Ejercicio 4
    mostrarUsers(usuarios:Array<User>):void{
        for(let i in usuarios)
        {
            usuarios[i].printinfo();
        }
    }
    //Ejercicio 5
    evento (ev:Event):void{
        console.log("se hizo click");
        console.log(this);
    }
}

//Ejercicio 3
class User {
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;

    constructor(id:number, name:string, email:string) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    set id(id:number)
        {
            this._id = id;
        }
    get id():number
    {
        return this._id;
    }
    set name(name:string)
    {
        this._name = name;
    }
    get name():string
    {
        return this._name;
    }
    set email(email:string)
    {
        this._email = email;
    }
    get email():string
    {
        return this._email;
    }

    printinfo():void
    {
        console.log("id = " + this._id + ", name = " + this._name + ", email = " + this._email);
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
