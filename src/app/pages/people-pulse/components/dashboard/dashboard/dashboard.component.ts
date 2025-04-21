import { Component } from '@angular/core';
import { StatsWidgetComponent } from '../stats-widget/stats-widget.component';
import { StudentDistributionWidgetComponent } from "../student-distribution-widget/student-distribution-widget.component";
import { AttendanceWidgetComponent } from "../attendance-widget/attendance-widget.component";
import { NotificationsWidget } from '../../../../dashboard/components/notificationswidget';
import { SharedModule } from '../../../../../../shared.module';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule,StatsWidgetComponent, StudentDistributionWidgetComponent, AttendanceWidgetComponent, NotificationsWidget],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
