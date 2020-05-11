import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/services/data-service.service";
import { GlobalDataSummary } from "src/app/models/global-data";
import { DateWiseData } from "src/app/models/date-wise-data";
import { merge } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.css"],
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[];
  contries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  SelectedCountryData: DateWiseData[];
  dateWiseData;
  chart = {
    LineChart: "LineChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: "out",
      },
      is3D: true,
    },
  };
  dataTable = [];
  constructor(private dataSer: DataServiceService) {}

  ngOnInit() {
    merge(
      this.dataSer.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.dataSer.getGlobalData().pipe(
        map((result) => {
          this.data = result;
          this.data.forEach((cs) => {
            this.contries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        /* this.SelectedCountryData = this.dateWiseData["Tunisia"];
        this.updateChart();*/
        this.updateValues("US");
        this.loading = false;
      },
    });
  }
  updateChart() {
    this.dataTable = [];
    //this.dataTable.push(["Date", "Cases"]);
    this.SelectedCountryData.forEach((cs) => {
      this.dataTable.push([cs.date, cs.cases]);
    });
  }

  updateValues(country: string) {
    // console.log(country);
    this.data.forEach((cs) => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalRecovered = cs.recovered;
        this.totalDeaths = cs.deaths;
      }
    });
    this.SelectedCountryData = this.dateWiseData[country];
    // console.log(this.SelectedCountryData);
    this.updateChart();
  }
}
