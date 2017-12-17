import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ResultsPage } from '../pages';

@Component({
  selector: "search",
  templateUrl: "search.page.html"
})
export class SearchPage {
  
  constructor(public navCtrl: NavController) {}

  showResultsPage(fuelType, radius) {
      this.navCtrl.push(ResultsPage, {
        "fuelType":fuelType,
        "radius":radius
      });
  }

  locateUser(){
    
  }
}
