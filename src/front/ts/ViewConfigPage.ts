class ViewConfigPage{
    private framework:MyFramework;
    constructor(framework:MyFramework){
        this.framework = framework;
    }

    

    showConfiguration():void{
        let body:HTMLElement = this.framework.getElementById("pagebody");
        body.innerHTML = `  
                            <div class="container">
                                <h4>Opciones</h4>
                                <ul class="collection">
                                    <li class="collection-item avatar">
                                        <img src="static/images/shutdown.png" alt="" class="circle">
                                        <span class="title">Apagar todos los dispositivos</span>
                                        <div class="secondary-content">
                                            <a class="waves-effect waves-light btn-small red" id="sdbutton">Apagar</a>
                                        </div>
                                    </li>
                                    <li class="collection-item avatar">
                                        <img src="static/images/adddevice.png" alt="" class="circle">
                                        <span class="title">Añadir dispositivo</span>
                                        <div class="secondary-content">
                                            <a class="btn-floating btn-small waves-effect waves-light green" ><i class="material-icons" id="addbutton">add</i></a>
                                        </div>
                                    </li>
                                    <li class="collection-item avatar">
                                        <img src="static/images/deletedevice.png" alt="" class="circle">
                                        <span class="title">Quitar dispositivo</span>
                                        <div class="secondary-content">
                                            <a class="btn-floating btn-small waves-effect waves-light red" ><i class="material-icons" id="removebutton">remove</i></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>    
      `;
    }


    showAddForm():void{
        let body:HTMLElement = this.framework.getElementById("pagebody");
        body.innerHTML =`
        <div class="container">
            <h4>Datos del dispositivo</h4>
            <div class="row">
                <form class="col s12" action="/addform/" method="post">
                    <div class="row">
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="addform_name" id="addform_name" type="text" class="validate" required minlength="3" maxlength="15">
                                <label for="device_name">Nombre del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="addform_des" id="addform_des" type="text" class="validate" required minlength="6" maxlength="20">
                                <label for="device_description">Descripción del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="addform_state" id="addform_state" type="number" min="0" max="1" class="validate" required>
                                <label for="device_state">Estado</label>
                                <p>Colocar 1 para encendido, 0 para apagado</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="addform_type" id="addform_type" type="number" class="validate" required min="0" max="1">
                                <label for="device_type">Tipo</label>
                                <p>Colocar 0 para lámpara o 1 para cortina</p>
                            </div>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" style="margin-bottom:15px;">Añadir
                    <i class="material-icons right">add</i>
                    </button>
                </form>
            </div>
        </div>`;
        

    }
   
        showRmForm(list:DeviceInt[]):void{
            let d: HTMLElement = this.framework.getElementById("pagebody");
            d.innerHTML = `        <br/>
                                   <div class="container">
                                        <a id="dispositivos"></a>
                                        <h4>Dispositivos</h4>
                                        <p>Seleccione el dispositivo que desea eliminar</p>
                                        <ul class="collection", id="deviceList">
                                        <br/>
                                        <br/>
                                        </ul>
                                    </div>`;
            let insertlist: HTMLElement = this.framework.getElementById("deviceList");
            let imageURL: string;
            
            for (let dev of list) {
                imageURL = dev.type == 0 ? "static/images/lightbulb.png" : "static/images/window.png";
                insertlist.innerHTML += `<li class="collection-item avatar">
                                    <img src=${imageURL} alt="" class="circle">
                                    <span class="title">${dev.name}</span>
                                    <p>${dev.description}</p>
                                    <div class="secondary-content">
                                        <a class="btn-floating btn-small waves-effect waves-light red" ><i class="material-icons" id="${dev.id}">clear</i></a>
                                    </div>
                                </li>`;
            }
        }
}