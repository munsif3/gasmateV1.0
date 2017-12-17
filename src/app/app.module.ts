import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { MyApp } from "./app.component";
import { SearchPage, ResultsPage, AboutPage, ShedPage, DirectionPage } from "../pages/pages";

import { HttpModule } from "@angular/http";
import { AgmCoreModule } from "@agm/core/core.module";

@NgModule({
  declarations: [
    MyApp, 
    SearchPage, 
    ResultsPage, 
    AboutPage,
    ShedPage,
    DirectionPage
  ],
  imports: [
    BrowserModule, 
    HttpModule, 
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBfzWA1w9O6ZhhQTJizHq-FlutkfBT-tg0'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    SearchPage, 
    ResultsPage, 
    AboutPage,
    ShedPage,
    DirectionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler 
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
