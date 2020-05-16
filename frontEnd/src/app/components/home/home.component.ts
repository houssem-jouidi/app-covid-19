import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "src/app/services/data-service.service";
import { GlobalDataSummary } from "src/app/models/global-data";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  loading = true;
  datatable = [];
  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",

    height: 500,

    options: {
      animation: {
        duration: 1000,
        easing: "out",
      },

      is3D: true,
    },
  };

  constructor(
    private dataSer: DataServiceService,
    public translate: TranslateService
  ) {}
  initChart(caseType: string) {
    // this.datatable.push(["Country", " Cases"]);
    this.datatable = [];
    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType === "c") {
        if (cs.confirmed > 2000) {
          value = cs.confirmed;
        }
      }

      if (caseType === "a") {
        if (cs.active > 2000) {
          value = cs.active;
        }
      }
      if (caseType === "d") {
        if (cs.deaths > 2000) {
          value = cs.deaths;
        }
      }

      if (caseType === "r") {
        if (cs.recovered > 2000) {
          value = cs.recovered;
        }
      }

      this.datatable.push([cs.country, value]);
    });
  }
  ngOnInit() {
    this.dataSer.getGlobalData().subscribe({
      next: (result) => {
        // console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });
        this.initChart("c");
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  updateChart(input: HTMLInputElement) {
    //  console.log(input.value);
    this.initChart(input.value);
  }
}
