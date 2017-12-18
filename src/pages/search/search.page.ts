import { Component, NgZone, ElementRef, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms";
import {} from "@types/googlemaps";

import { ResultsPage } from "../pages";

declare var google: any;

@Component({
    selector: "search",
    templateUrl: "search.page.html"
})
export class SearchPage {

    public searchControl: FormControl;
    public searchBar: String = "";
    @ViewChild("search", { read: ElementRef }) public searchElementRef: ElementRef;
    public userLocation: any;

    constructor (
        public navCtrl: NavController,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader
    ) { }

    ngOnInit() {
        this.searchControl = new FormControl();
        this.setCurrentPosition();
        this.mapsAPILoader.load().then(() => {
            let typedLocation = this.searchElementRef.nativeElement.getElementsByTagName("input").search;
            let autocomplete = new google.maps.places.Autocomplete(typedLocation, { types: ["address"] });
            
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if ( place.geometry === undefined || place.geometry === null ) {
                        return;
                    }
                });
            });
        });
    }

    setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.userLocation = pos;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: pos },  (results, status) => {
                    if (status == "OK") {
                        this.searchBar = results[0].formatted_address;
                    } else {
                        console.log("Error Fetching User Location");
                    }
                });
            });
        }
    }

    showResultsPage (fuelType, radius) {
        this.navCtrl.push(ResultsPage, {
            userLocation: this.userLocation,
            fuelType: fuelType,
            radius: radius
        });
    }
}
