import { Component, NgZone, ElementRef, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
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

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    @ViewChild('search',  { read: ElementRef }) public searchElementRef: ElementRef;

    constructor(
        public navCtrl: NavController,
        private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader
    ) {}

    ngOnInit() {
        // console.log(this.searchElementRef.nativeElement)
        // console.log(this.searchElementRef.nativeElement.getElementsByTagName('input'));
        this.searchControl = new FormControl();
        this.mapsAPILoader.load().then(
            () => {
                let typedLocation = this.searchElementRef.nativeElement.getElementsByTagName('input').search;
                console.log(typedLocation )
                let autocomplete = new google.maps.places.Autocomplete(typedLocation , { types: ["address"] });
                autocomplete.addListener('place_changed', () => {
                    this.ngZone.run(() => {
                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                        console.log("place", place);
                        if(place.geometry === undefined || place.geometry === null) {
                            return;
                        }
                    });
                })
            }
        );
    }

    // ngOnInit() {
        // console.log("this.searchElementRef", this.searchElementRef)
        //set google maps defaults
        // this.zoom = 4;
        // this.latitude = 39.8282;
        // this.longitude = -98.5795;

        //create search FormControl
        // this.searchControl = new FormControl();

        // //set current position
        // this.setCurrentPosition();

        // //load Places Autocomplete
        // this.mapsAPILoader.load().then(() => {
        //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { types: ["address"] });

        //     autocomplete.addListener("place_changed", () => {
        //         this.ngZone.run(() => {
        //             //get the place result
        //             let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //             console.log('place', place)                    
                    
        //             //verify result
        //             if ( place.geometry === undefined || place.geometry === null ) {
        //                 console.log('lol...........................................')
        //                 return;
        //             }
        //             //set latitude, longitude and zoom
        //             // this.latitude = place.geometry.location.lat();
        //             // this.longitude = place.geometry.location.lng();
        //             // this.zoom = 12;
        //         });
        //     });
        // });
    // }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;

            // var geocoder = new google.maps.Geocoder;
            // geocoder.geocode({'location': pos}, function(results, status) {}
          });
        }
      }

    showResultsPage(fuelType, radius) {
        this.navCtrl.push(ResultsPage, {
            fuelType: fuelType,
            radius: radius
        });
    }

    searchLocation() {
        console.log("inside searchLocation()")        
    }

}
