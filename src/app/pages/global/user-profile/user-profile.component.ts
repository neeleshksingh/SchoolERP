import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'app-user-profile',
  imports: [SharedModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user = {
    id: 'EMP2024056',
    name: 'Priya Sharma',
    profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/028/632/671/small_2x/female-teacher-europe-generate-ai-photo.jpg',
    designation: 'Mathematics Teacher',
    department: 'Secondary Section',
    email: 'priya.sharma@schoolname.edu.in',
    phone: '+91 98765 43210',
    joiningDate: '15 Jun 2020',
    gender: 'Female',
    bloodGroup: 'B+',
    qualification: 'M.Sc., B.Ed',
    status: 'Active',
    role: 'Teacher',
    rolePermissions: [
      { name: 'Attendance Management', access: true },
      { name: 'Examination Results', access: true },
      { name: 'Student Records', access: true },
      { name: 'Fee Management', access: false },
      { name: 'Timetable Management', access: true }
    ],
    address: {
      current: '203, Lakshmi Apartments, Sector 18, Gandhinagar, Gujarat - 382018',
      permanent: 'B-12, Shanti Nagar Colony, Near City Mall, Ahmedabad, Gujarat - 380015'
    },
    employmentDetails: {
      employeeId: 'EMP2024056',
      department: 'Mathematics',
      designation: 'Senior Teacher',
      employmentType: 'Full-time',
      joiningDate: '2020-06-15',
      currentGrade: 'Grade 2',
      reportingManager: 'Dr. Ramesh Patel (Head of Department)',
      workSchedule: 'Monday to Friday (8:00 AM - 4:00 PM)',
      aadhaarNo: 'XXXX XXXX 5678',
      panNo: 'ABCTY1234D',
      bankDetails: {
        accountNo: 'XXXXX56789',
        bankName: 'State Bank of India',
        ifscCode: 'SBIN0001234',
        branch: 'Gandhinagar'
      }
    },
    emergencyContact: {
      name: 'Vikram Sharma',
      relation: 'Spouse',
      phone: '+91 98765 12345',
      address: '203, Lakshmi Apartments, Sector 18, Gandhinagar, Gujarat - 382018'
    },
    skills: [
      { name: 'Mathematics', level: 95 },
      { name: 'Computer Science', level: 80 },
      { name: 'Student Counseling', level: 90 },
      { name: 'Curriculum Development', level: 75 }
    ],
    educationHistory: [
      {
        degree: 'M.Sc. in Mathematics',
        institution: 'Gujarat University',
        year: '2018',
        score: '8.9 CGPA'
      },
      {
        degree: 'B.Ed',
        institution: 'Faculty of Education, Delhi University',
        year: '2019',
        score: '85%'
      },
      {
        degree: 'B.Sc. in Mathematics',
        institution: `St. Xavier's College, Ahmedabad`,
        year: '2016',
        score: '82%'
      }
    ],
    workHistory: [
      {
        position: 'Junior Mathematics Teacher',
        organization: 'Delhi Public School, New Delhi',
        period: 'July 2019 - May 2020',
        description: 'Taught mathematics to classes 8-10.'
      }
    ],
    achievements: [
      'Best Teacher Award (2022)',
      'Organized District Level Mathematics Olympiad (2023)',
      'Published paper on "Innovative Methods of Teaching Mathematics" in National Education Journal'
    ],
    documents: [
      { name: 'Aadhaar Card', verified: true },
      { name: 'PAN Card', verified: true },
      { name: 'Educational Certificates', verified: true },
      { name: 'Experience Letters', verified: true },
      { name: 'Police Verification', verified: true }
    ]
  };

  events = [
    { status: 'Joined as Mathematics Teacher', date: '15 Jun 2020', icon: 'pi pi-user-plus', color: '#4CAF50' },
    { status: 'Promoted to Senior Teacher', date: '10 Apr 2022', icon: 'pi pi-arrow-up', color: '#2196F3' },
    { status: 'Completed 3 Years Service', date: '15 Jun 2023', icon: 'pi pi-calendar', color: '#9C27B0' },
    { status: 'Received Best Teacher Award', date: '05 Sep 2022', icon: 'pi pi-star', color: '#FF9800' }
  ];

  constructor() { }

  ngOnInit(): void { }

  getRoleTagSeverity(access: boolean): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    if (access) return 'success';
    return 'danger';
    return 'secondary';
  }

  getRoleTagText(access: boolean): string {
    return access ? 'Granted' : 'Restricted';
  }
}
