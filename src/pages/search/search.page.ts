import { Component, NgZone, ElementRef, ViewChild } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
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
    @ViewChild("search", { read: ElementRef })
    public searchElementRef: ElementRef;

    constructor (
        public navCtrl: NavController,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader,
        private platform: Platform
    ) { }

    ngOnInit() {
        this.searchControl = new FormControl();
        // this.allowDynamicSearch();
        this.setCurrentPosition();
        this.mapsAPILoader.load().then(() => {
            let typedLocation = this.searchElementRef.nativeElement.getElementsByTagName("input").search;
            let autocomplete = new google.maps.places.Autocomplete(typedLocation, { types: ["address"] });
            
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    if ( place.geometry === undefined || place.geometry === null ) {
                        return;
                    } else {
                        console.log("Error Fetching Suggestions");
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
                // let willType = this.searchElementRef.nativeElement.getElementsByTagName("input").search;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: pos },  (results, status) => {
                    if (status == "OK") {
                        this.searchBar = results[0].formatted_address;
                        // console.log("Fetched Location before:", results[0].formatted_address);
                        // willType.value = results[0].formatted_address;
                    } else {
                        console.log("Error Fetching User Location");
                    }
                });
            });
        }
    }

    showResultsPage (fuelType, radius) {
        this.navCtrl.push(ResultsPage, {
            fuelType: fuelType,
            radius: radius
        });
    }
}
