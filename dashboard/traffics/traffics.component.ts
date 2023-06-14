import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-traffics',
  templateUrl: './traffics.component.html',
  styleUrls: ['./traffics.component.css']
})
export class TrafficsComponent implements AfterViewInit, OnChanges {
  @Input() traffics = {
    values: [],
    labels: [],
    title: 'مقدار ترافیک در '
  };

  @ViewChild('chartCanvas') chartCanvas: ElementRef;
  private chart: Chart;

  ngOnChanges(): void {
    if (this.traffics && this.traffics.values && this.traffics.labels) {
      this.updateChart();
    }
  }

  ngAfterViewInit(): void {
    this.initialize();
  }

  private initialize(): void {
    if (this.chartCanvas && this.chartCanvas.nativeElement && this.traffics && this.traffics.values && this.traffics.labels) {
      const chartData = {
        labels: this.traffics.labels,
        datasets: [
          {
            label: 'Traffics',
            data: this.traffics.values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
      };

      const chartOptions = {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      };

      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }

  private updateChart(): void {
    if (this.chart && this.traffics && this.traffics.values) {
      this.chart.data.datasets[0].data = this.traffics.values;
      this.chart.update();
    }
  }
}
