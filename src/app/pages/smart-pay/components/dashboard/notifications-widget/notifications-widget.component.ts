import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared.module';

@Component({
  selector: 'app-notifications-widget',
  imports: [SharedModule],
  templateUrl: './notifications-widget.component.html',
  styleUrl: './notifications-widget.component.scss'
})
export class NotificationsWidgetComponent {
  items = [
    { label: 'View All', icon: 'pi pi-fw pi-list' },
    { label: 'Mark All as Read', icon: 'pi pi-fw pi-check' }
];
}