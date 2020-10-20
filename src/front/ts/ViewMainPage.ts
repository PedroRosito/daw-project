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
                            </li>`;
        }
    }

    getSwitchStateById(id: string): boolean {
        let e: HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement>e; //permito que e sea checkeado
        return i.checked;
    }
}