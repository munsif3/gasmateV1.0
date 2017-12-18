import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
// import { MapsAPILoader } from "@agm/core";

declare var window: any;

@Component({
    selector: "direction",
    templateUrl: "direction.page.html"
})
export class DirectionPage {

    map: any = {};

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
        // ,public mapsApi: GoogleMapsAPIWrapper
    ) {}

    ionViewWillEnter() {      
        this.map = {
            lat: this.navParams.data.location.latitude,
            lng: this.navParams.data.location.longitude,
            zoom: 13,
            markerLabel: this.navParams.data.address
        };        
    }

    // ngOnInit(){
    //     this.mapsApi.getNativeMap().then(map => {
    //         var directionsService = new google.maps.DirectionsService;
    //         var directionsDisplay = new google.maps.DirectionsRenderer;
    //         directionsDisplay.setMap(map);
    //         var route = {
    //             origin: {lat: this.origin.latitude, lng: this.origin.longitude},
    //             destination: {lat: this.destination.latitude, lng: this.destination.longitude},
    //             waypoints: [],
    //             optimizeWaypoints: true,
    //             travelMode: 'DRIVING'
    //         };
    //         directionsService.route(route, function(response, status) {
    //             if (status === 'OK') {
    //             directionsDisplay.setDirections(response);
    //             } else {
    //             window.alert('Directions request failed due to ' + status);
    //             }
    //         });
    //   });
    // }

    getDirections(){
        console.log( `geo:${this.map.lat},${this.map.lng};u=35`)
        window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
    }
}
