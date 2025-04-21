import { Component, OnInit } from '@angular/core';

import studentData from '../student-data.json';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  student: any;

  constructor() { }

  ngOnInit(): void {
    this.student = studentData;
  }

  getInitials(name: string): string {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  getAttendanceClass(percentage: number): string {
    if (percentage >= 90) return 'custom-progress-success';
    if (percentage >= 75) return 'custom-progress-warning';
    return 'custom-progress-danger';
  }

  getSubjectProgressClass(percentage: number): string {
    if (percentage >= 90) return 'custom-progress-success';
    if (percentage >= 75) return 'custom-progress-warning';
    if (percentage >= 60) return 'custom-progress-info';
    return 'custom-progress-danger';
  }

  getGradeSeverity(grade: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (grade.toLowerCase()) {
      case 'a':
        return 'success';
      case 'b':
        return 'info';
      case 'c':
        return 'warn';
      case 'd':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}