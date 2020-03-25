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
    this.apiService.getData()
      .subscribe(res => {
        console.log(res);
        this.globalCases = res.data
      });
  }
}
