import { PersianDatePipe } from './../../../../pipes/persian-date.pipe';
import { map } from 'rxjs/operators';
import { StatisticService } from './../../../../services/statistic.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  visitors = {
    values: [],
    labels: [],
    title: 'تعداد بازدیدکنندگان در '
  };
  traffics = {
    values: [],
    labels: [],
    title: 'ترافیک در '
  };
  initialized = false;
  constructor(private dialog: MatDialog, private statistic: StatisticService, private datePipe: PersianDatePipe) { }

  ngOnInit(): void {
    this.statistic.getVisitors('7d').subscribe(res => {
      this.visitors.values = res.data.charts.visitors.series[0].data;
      this.visitors.labels = res.data.charts.visitors.categories.map((c: any) => this.datePipe.transform(c));
      this.visitors.title += 'یک هفته گذشته';
      console.log('Visitors Data:', this.visitors);
      this.initialized = true;
    });
    this.statistic.getTraffics('7d').subscribe(res => {
      // console.log(res);
      
      this.traffics.values = res.data.charts.traffics.series[0].data;
      this.traffics.labels = res.data.charts.traffics.categories.map((c: any) => this.datePipe.transform(c));
      this.traffics.title += 'یک هفته گذشته';
      this.initialized = true;
      console.log('Traffics Data:', this.traffics);
     	// console.log(res);
	 this.traffics = res;
    });
  }

}
