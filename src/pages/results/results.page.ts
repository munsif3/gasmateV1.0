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
      let userLocation = this.navParams.get("userLocation");
      let fuelType = this.navParams.get("fuelType");
      let radius = this.navParams.get("radius");
      this.gasmateService.getStations().then(data => {
        let newArr = [];
        if (fuelType != undefined) {
          for (var i in data) {
            for(var j in data[i].types){
              if(data[i].types[j].name === fuelType){
                if (data[i].distance <= radius && data[i].types[j].amount > 10 ) {
                  data[i]["userLocation"] = userLocation;
                  newArr.push(data[i]);
                }
              }
            }
          }
          this.sheds = newArr;
        } else {
          this.sheds = false;
        }
        loader.dismiss();
      });
    });
  }

  shedSelected($event, shed) {
    console.log("shed",shed)
    this.navCtrl.push(ShedPage, shed);
  }
  
}
