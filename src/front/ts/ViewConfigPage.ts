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
                                        <img src="images/yuna.jpg" alt="" class="circle">
                                        <span class="title">Apagar todos los dispositivos</span>
                                        <div class="secondary-content">
                                            <a class="waves-effect waves-light btn-small red" id="sdbutton">Apagar</a>
                                        </div>
                                    </li>
                                    <li class="collection-item avatar">
                                        <i class="material-icons circle">folder</i>
                                        <span class="title">Añadir dispositivo</span>
                                        <div class="secondary-content">
                                            <a class="btn-floating btn-small waves-effect waves-light green" ><i class="material-icons" id="addbutton">add</i></a>
                                        </div>
                                    </li>
                                    <li class="collection-item avatar">
                                        <i class="material-icons circle green">insert_chart</i>
                                        <span class="title">Quitar dispositivo</span>
                                        <div class="secondary-content">
                                            <a class="btn-floating btn-small waves-effect waves-light red" ><i class="material-icons" id="removebutton">remove</i></a>
                                        </div>
                                </ul>
                            </div>    
      `;
    }


    showAddForm():void{
        let body:HTMLElement = this.framework.getElementById("pagebody");
        body.innerHTML = `
        <div class="container">
            <h4>Datos del dispositivo</h4>
            <div class="row">
                <form class="col s12" action="/addform/" method="post">
                    <div class="row">
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="addform_name" type="text" class="validate">
                                <label for="device_name">Nombre del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="addform_des" type="text" class="validate">
                                <label for="device_description">Descripción del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="addform_state" type="number" class="validate">
                                <label for="device_state">Estado</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="addform_type" type="number" class="validate">
                                <label for="device_type">Tipo</label>
                            </div>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" style="margin-bottom:15px;">Enviar
                    <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
        </div>`;

    }

    showRmForm():void{
        let body:HTMLElement = this.framework.getElementById("pagebody");
        body.innerHTML =`
        <div class="container">
            <h4>Datos del dispositivo</h4>
            <div class="row">
                <form class="col s12" action="/rmform/" method="post">
                    <div class="row">
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="rmform_name" type="text" class="validate">
                                <label for="device_name">Nombre del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="rmform_des" type="text" class="validate">
                                <label for="device_description">Descripción del dispositivo</label>
                            </div>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="action" style="margin-bottom:15px;" red>Eliminar
                    <i class="material-icons right">Remove</i>
                    </button>
                </form>
            </div>
        </div>`;
    }

}