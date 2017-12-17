import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DirectionPage } from "../pages";

@Component({
    selector: "shed",
    templateUrl: "shed.page.html"
})

export class ShedPage {
    selectedShed: any = {};
    fuelTypes: any;
    location: any;
    constructor(public navCtrl: NavController, 
                public navParams: NavParams) {}

    ionViewDidLoad() {
        console.log(this.navParams.data);
        this.selectedShed = this.navParams.data;
        this.fuelTypes = this.navParams.data.types;
        this.location = this.navParams.data.location;
    }

    getDirections() {
        this.navCtrl.push(DirectionPage, this.selectedShed);
    }
}
