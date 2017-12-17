import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { GasMateService } from "../../app/services/gasmate.service";
import { ShedPage } from "../pages";

@Component({
  selector: "results",
  templateUrl: "results.page.html"
})
export class ResultsPage {
  
  sheds: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private gasmateService: GasMateService,
              private loadingContoller: LoadingController) {}

  ionViewDidLoad() {
    let loader = this.loadingContoller.create({
      content: "Fetching the Stations..."
    });

    loader.present().then(() => {
      let fuelType = this.navParams.get("fuelType");
      let radius = this.navParams.get("radius");
      this.gasmateService.getStations().then(data => {
        let newArr = [];
        // if(fuelType != undefined){
          console.log("data ",data)
          for (var i = 0; i < data.length; i++) {
              // if (fuelType in data[i].types && data[i].distance <= radius) {
                  newArr.push(data[i]);
              // }
          }
          this.sheds = newArr;
        // } else {
          // this.sheds = false;
        // }
        loader.dismiss();
      });
    });
  }

  shedSelected($event, shed) {
    this.navCtrl.push(ShedPage, shed);
  }
  
}
