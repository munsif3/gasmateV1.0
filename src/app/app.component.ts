import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpModule } from "@angular/http";

import { GasMateService } from "./services/gasmate.service";
import { SearchPage, AboutPage } from "../pages/pages";

@Component({
    templateUrl: "app.html",
    providers: [ GasMateService, HttpModule ]
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage: any = SearchPage;
    pages: Array<{ title: string; component: any }>;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen
    ) {
        this.initializeApp();

        this.pages = [
            { title: "Search Sheds", component: SearchPage },
            { title: "About Us", component: AboutPage }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
