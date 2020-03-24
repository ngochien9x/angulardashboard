import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public globalCases: number;
  public globalLastUpdated: string;
  public vietnamLastUpdated: string;

  constructor(public apiService: ApiService) { }
  
  ngOnInit() {
    this.globalCases = 0;
    this.getData();
  }

  getData() {
    const body = {"operationName":"countries","variables":{},"query":"query countries {\n  globalCasesToday {\n    country\n    totalCase\n    totalDeaths\n    totalRecovered\n    longitude\n    latitude\n    __typename\n  }\n  provinces {\n    Province_Name\n    Province_Id\n    Lat\n    Long\n    Confirmed\n    Deaths\n    Recovered\n    Last_Update\n    __typename\n  }\n}\n"};
    this.apiService.getData(body)
      .subscribe(res => {
        console.log(res);
      });
  }
}
