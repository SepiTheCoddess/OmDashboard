import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements AfterViewInit, OnChanges {
  @Input() visitors = {
    values: [],
    labels: [],
    title: 'تعداد بازدیدکنندگان در '
  };

  @ViewChild('chartCanvas') chartCanvas: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement && changes.visitors && changes.visitors.currentValue) {
      const currentDay = this.getCurrentDay();
      this.visitors.labels[6] = currentDay; // Set the last label to the current day
      this.initialize();
    }
  }

  ngAfterViewInit(): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement && this.visitors && this.visitors.values && this.visitors.labels) {
      this.initialize();
    }
  }

  initialize(): void {
    const chartData = {
      labels: this.visitors.labels,
      datasets: [
        {
          label: 'Visitors',
          data: this.visitors.values,
          backgroundColor: [
          'rgba(75, 192, 192, 0.4)',
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(255, 159, 64, 0.4)'
        ],
          borderColor: [
            'rgba(75, 192, 192, 2)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }

  private getCurrentDay(): string {
    const weekdays = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
    const currentDate = moment().locale('fa').format('dddd');
    const index = weekdays.indexOf(currentDate);
    return weekdays[index];
  }
}
