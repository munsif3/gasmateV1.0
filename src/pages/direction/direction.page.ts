import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

declare var window: any;

@Component({
    selector: "direction",
    templateUrl: "direction.page.html"
})
export class DirectionPage {

    map: any = {};

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {}

    ionViewWillEnter() {      
        this.map = {
            lat: this.navParams.data.location.latitude,
            lng: this.navParams.data.location.longitude,
            zoom: 13,
            markerLabel: this.navParams.data.address
        };
        window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
    }

    getDirections(){
        console.log( `geo:${this.map.lat},${this.map.lng};u=35`)
        window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
    }
}
