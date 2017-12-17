import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/Rx";
// import { Observable } from "rxjs";

@Injectable()
export class GasMateService {

  private baseUrl = "https://gasmatetest.firebaseio.com/";
  currentShed: any = {};
  
  constructor(private http: Http) {}
  
  getStations(): Promise<any> {
    return new Promise(resolve => {
      this.http
        .get(`${this.baseUrl}/sheds.json`)
        .subscribe(response => resolve(response.json()));
    });
  }

  getStationData(shedId) {
    this.http
      .get(`${this.baseUrl}/sheds/${shedId}.json`)
      .map((response) => {
        this.currentShed = response.json();
        return this.currentShed;  
      });
  }

}
