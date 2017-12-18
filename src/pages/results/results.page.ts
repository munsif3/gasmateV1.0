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
        if (fuelType != undefined) {          
          for (var i = 0; i < data.length; i++) {
            // for(var j = 0; j < data[i].types.length; j++){
            //   if(Object.values(data[i].types[j]).indexOf(fuelType) > -1){                
            //     if (data[i].distance <= radius && data[i].types[j]["amount"] > 0 ) {
            //       newArr.push(data[i]);
            //     }
            //   }
            // }
            for(const k in data[i].types){
              if(data[i].types[k] === fuelType){
                if (data[i].distance <= radius && data[i].types[k]["amount"] > 0 ) {
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
    this.navCtrl.push(ShedPage, shed);
  }
  
}
