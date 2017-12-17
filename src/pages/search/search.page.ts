import { Component, NgZone, ElementRef, ViewChild } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms";
import {} from "@types/googlemaps";

import { ResultsPage } from "../pages";

declare var geolocation: any;
declare var google: any;

@Component({
    selector: "search",
    templateUrl: "search.page.html"
})
export class SearchPage {
    public searchControl: FormControl;
    public searchbar: String = "0";

    @ViewChild("search", { read: ElementRef })
    public searchElementRef: ElementRef;

    constructor(
        public navCtrl: NavController,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader,
        private platform: Platform
    ) { }

    ngOnInit() {
        this.setCurrentPosition();
        this.searchControl = new FormControl();
        this.mapsAPILoader.load().then(() => {
            let typedLocation = this.searchElementRef.nativeElement.getElementsByTagName("input").search;
            let autocomplete = new google.maps.places.Autocomplete(typedLocation, { types: ["address"] });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    console.log("place", place);
                    if ( place.geometry === undefined || place.geometry === null ) {
                        return;
                    } else {
                        console.log("Error Fetching Suggestion");
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
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: pos }, function(results, status) {
                    if (status == "OK") {
                        this.searchbar = results[0].formatted_address;
                        console.log("results", results[0].formatted_address);
                    } else {
                        console.log("Error Fetching Location");
                    }
                });
            });
        }
    }

    showResultsPage(fuelType, radius) {
        this.navCtrl.push(ResultsPage, {
            fuelType: fuelType,
            radius: radius
        });
    }
}
