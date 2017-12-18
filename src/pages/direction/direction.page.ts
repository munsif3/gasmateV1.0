import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
    selector: "direction",
    templateUrl: "direction.page.html"
})
export class DirectionPage {

    stationLocation: any = {};
    userLocation: any = {};
    map: any;

    @ViewChild('map', { read: ElementRef }) mapElement: ElementRef;
    @ViewChild("directionsPanel", { read: ElementRef }) directionsPanel: ElementRef;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) { }

    ionViewWillEnter() {
        this.stationLocation = {
            lat: this.navParams.data.location.latitude,
            lng: this.navParams.data.location.longitude            
        };

        let mapOptions = {
            center: this.stationLocation,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

    startNavigating() {
        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer();

        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
                origin: this.navParams.data.userLocation,
                destination: this.stationLocation,
                travelMode: google.maps.TravelMode["DRIVING"]
            }, (res, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(res);
                } else {
                    console.warn(status);
                }
            }
        );
    }
}
