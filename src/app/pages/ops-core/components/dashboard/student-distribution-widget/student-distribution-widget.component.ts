import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared.module';

@Component({
  selector: 'app-student-distribution-widget',
  imports: [SharedModule],
  templateUrl: './student-distribution-widget.component.html',
  styleUrl: './student-distribution-widget.component.scss'
})
export class StudentDistributionWidgetComponent {
  items = [
    { label: 'View Details', icon: 'pi pi-fw pi-search' },
    { label: 'Export', icon: 'pi pi-fw pi-download' }
];
}
