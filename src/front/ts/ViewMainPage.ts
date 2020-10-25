class ViewMainPage {

    private myf: MyFramework;
    constructor(myf: MyFramework) {
        this.myf = myf;
    }

    showDevices(list: DeviceInt[]): void {
        let d: HTMLElement = this.myf.getElementById("deviceList");
        let imageURL: string;
        let state: string;
        
        for (let dev of list) {
            imageURL = dev.type == 0 ? "static/images/lightbulb.png" : "static/images/window.png";
            state = dev.state == 0 ? "" : "checked";
            d.innerHTML += `<li class="collection-item avatar">
                                <img src=${imageURL} alt="" class="circle">
                                <span class="title">${dev.name}</span>
                                <p>${dev.description}</p>
                                <a href="#!" class="secondary-content">
                                    <div class="switch">
                                        <label>
                                        Off
                                        <input id="dev_${dev.id}" type="checkbox" ${state} >
                                        <span class="lever"></span>
                                        On
                                        </label>
                                    </div>
                                </a>
                                <a class="waves-effect waves-light btn-small" id="modb_${dev.id}">Modificar</a>
                            </li>`;
        }
    }

    showModForm(id: number):void{
        let body:HTMLElement = this.myf.getElementById("pagebody");
        body.innerHTML =`
        <div class="container">
            <h4>Datos del dispositivo</h4>
            <div class="row">
                <form class="col s12" action="/modform/" method="post">
                    <div class="row">
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="modform_name" id="modform_name" type="text" class="validate" required minlength="3" maxlength="15">
                                <label for="device_name">Nombre del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="modform_des" id="modform_des" type="text" class="validate" required minlength="6" maxlength="20">
                                <label for="device_description">Descripción del dispositivo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input name="modform_type" id="modform_type" type="number" class="validate" required min="0" max="1">
                                <label for="device_type">Tipo</label>
                                <p>Colocar 0 para lámpara o 1 para cortina</p>
                            </div>
                        </div>
                    </div>
                    <input name="modform_id" id="modform_id" type="hidden" value="${id}">
                    <button class="btn waves-effect waves-light" type="submit" name="action" style="margin-bottom:15px;">Enviar cambios
                    </button>
                </form>
            </div>
        </div>`;
    }

    getSwitchStateById(id: string): boolean {
        let e: HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement>e; //permito que e sea checkeado
        return i.checked;
    }
}