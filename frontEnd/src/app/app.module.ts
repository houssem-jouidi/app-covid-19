import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { CountriesComponent } from "./components/countries/countries.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DashboardCardComponent } from "./components/dashboard-card/dashboard-card.component";
import { GoogleChartsModule } from "angular-google-charts";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { DataServiceService } from "./services/data-service.service";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [
    DataServiceService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
