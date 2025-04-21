import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared.module';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '../../../../../layout/service/layout.service';

@Component({
  selector: 'app-attendance-widget',
  imports: [SharedModule],
  templateUrl: './attendance-widget.component.html',
  styleUrl: './attendance-widget.component.scss'
})
export class AttendanceWidgetComponent {
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;

  constructor(public layoutService: LayoutService) {
      this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
          this.initChart();
      });
  }

  ngOnInit() {
      this.initChart();
  }

  initChart() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const borderColor = documentStyle.getPropertyValue('--surface-border');
      const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

      this.chartData = {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
              {
                  type: 'bar',
                  label: 'Student Attendance',
                  backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                  data: [92, 89, 94, 91],
                  barThickness: 32
              },
              {
                  type: 'bar',
                  label: 'Teacher Attendance',
                  backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                  data: [96, 98, 97, 99],
                  barThickness: 32
              },
              {
                  type: 'bar',
                  label: 'Staff Attendance',
                  backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                  data: [94, 95, 93, 96],
                  borderRadius: {
                      topLeft: 8,
                      topRight: 8,
                      bottomLeft: 0,
                      bottomRight: 0
                  },
                  borderSkipped: false,
                  barThickness: 32
              }
          ]
      };

      this.chartOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              },
              tooltip: {
                  callbacks: {
                      label: function(context : any) {
                          return context.dataset.label + ': ' + context.raw + '%';
                      }
                  }
              }
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      color: textMutedColor
                  },
                  grid: {
                      color: 'transparent',
                      borderColor: 'transparent'
                  }
              },
              y: {
                  stacked: true,
                  ticks: {
                      color: textMutedColor,
                      callback: function(value : any) {
                          return value + '%';
                      }
                  },
                  grid: {
                      color: borderColor,
                      borderColor: 'transparent',
                      drawTicks: false
                  },
                  min: 80,
                  max: 100
              }
          }
      };
  }

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }
}