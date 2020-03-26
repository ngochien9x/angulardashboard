import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public coronaGlobal: {
    cases: number,
    died: number,
    recoverd: number,
    lastUpdated: string
  }
  public coronaVietnam: {
    cases: number,
    died: number,
    recoverd: number,
    lastUpdated: string
  }

  constructor(public apiService: ApiService) { }
  ngOnInit() {
    this.coronaGlobal = {
      cases: 0,
      died: 0,
      recoverd: 0,
      lastUpdated: ''
    };
    this.coronaVietnam = {
      cases: 0,
      died: 0,
      recoverd: 0,
      lastUpdated: ''
    };
    this.getData();
    this.getDeadData();
    this.getRecoveredData();
    this.getCountriesProvinces();
  }

  getData() {
    this.apiService.getOverViewData()
      .subscribe(res => {
        console.log(res);
        this.coronaGlobal.cases = res.data.totalConfirmed;
      });
  }

  getDeadData() {
    this.apiService.getDeadData()
      .subscribe(res => {
        console.log(res);
        this.coronaGlobal.died = res.data.totalDeaths;
      });
  }

  getRecoveredData() {
    this.apiService.getRecoveredData()
      .subscribe(res => {
        console.log(res);
        this.coronaGlobal.recoverd = res.data.totalRecovered;
      });
  }

  getCountriesProvinces() {
    this.apiService.getCountriesProvinces()
      .subscribe(res => {
        console.log(res);
        res.data.provinces.forEach(element => {
          this.coronaVietnam.cases += this.formatNumber(element.Confirmed)
          this.coronaVietnam.died += this.formatNumber(element.Deaths)
          this.coronaVietnam.recoverd += this.formatNumber(element.Recovered)
        });
      });
  }

  private formatNumber(input) {
    return input === null ? 0 : input*100/100
  }
}
