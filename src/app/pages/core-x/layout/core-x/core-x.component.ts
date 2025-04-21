import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { Message } from 'primeng/message';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../../../shared/models/idp/Login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-core-x',
  imports: [SharedModule],
  templateUrl: './core-x.component.html',
  styleUrl: './core-x.component.scss'
})
export class CoreXComponent {
  items!: any[];
  errorMessage!: Message[];
  partnerCode!: string;
  id!: number;
  gg: any
  private currentUserSubject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')!));
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let url = window.location.href;
    // const rem = partnerBasicInfo.partners;

    // for (let ee in rem) {
    //   if (rem[ee].shortName !== "") {
    //     const ros = url.includes(rem[ee].shortName);
    //     if (ros) {
    //       const res = ee;
    //       //this.partnerCode = rem[ee].partnerCode;
    //       break;
    //     }
    //   }
    // }

    // const currentUser = this.currentUserSubject.value;
    // this.partnerCode = currentUser?.applicationUser?.partnerCode ?? '';

    // this.id = this.gg || 1;
    // var componentsRoles = this.router.config.filter(x => x.path == 'home')[0].children?.filter(x => x.path == 'cloudbytes')[0].data?.['userRoles'];

    // let isAllowed = false;
    // const currentUserJsonString = localStorage.getItem('currentUser') ?? "";

    // if (currentUserJsonString) {
    //   const loginResponse = JSON.parse(currentUserJsonString);
    //   var applicationUserRoles = loginResponse.applicationUser.roles;
    //   for (const role of componentsRoles) {
    //     for (const allowedRole of applicationUserRoles) {
    //       if (role.toLowerCase() === allowedRole.toLowerCase()) {
    //         isAllowed = true;
    //         break;
    //       }
    //     }
    //   }

    //   if (!isAllowed) {
    //     this.router.navigateByUrl('/home/cloudbytes/forbidden-access');
    //   }


      this.items = [
        { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/modules/core-x/dashboard'] },
        {
          label: 'Company', icon: 'fas fa-building', badgeStyleClass: 'text-badge',
          items: [
            {
              label: 'Partner', icon: 'pi pi-fw pi-users', badgeStyleClass: 'text-badge',
              items: [
                { label: 'Partner', icon: 'pi pi-fw pi-user', routerLink: ['/home/cloudbytes/company/partner/partner-view/' + this.partnerCode] },
                { label: 'Partner Image', icon: 'pi pi-fw pi-images', routerLink: ['/home/cloudbytes/company/partner/partner-image-list'] },
                { label: 'Partner ImageType', icon: 'pi pi-fw pi-file', routerLink: ['/home/cloudbytes/company/partner/partner-image-type-list'] },
                { label: 'Contact Category', icon: 'pi pi-fw pi-bars', routerLink: ['/home/cloudbytes/company/partner/partner-contact-category-list'] },
                { label: 'Contact Number', icon: 'pi pi-fw pi-book', routerLink: ['/home/cloudbytes/company/partner/partner-contact-number-list'] },
              ]
            },
            { label: 'Organizational Holidays', icon: 'pi pi-fw pi-sun', routerLink: ['/home/cloudbytes/company/organizational-holidays-list'] },
          ]
        },
        {
          label: 'Masters', icon: 'fas fa-database', badgeStyleClass: 'text-badge',
          items: [
            {
              label: 'Academics', icon: 'pi pi-fw pi-book', badgeStyleClass: 'text-badge',
              items: [
                { label: 'Academic Session', icon: 'pi pi-fw pi-clock', routerLink: ['/home/cloudbytes/masters/academics/academics-session-list'] },
                { label: 'Faculty', icon: 'pi pi-fw pi-user', routerLink: ['/home/cloudbytes/masters/academics/faculty-list'] },
                { label: 'Department', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/cloudbytes/masters/academics/department-list'] },
                { label: 'Degree Type', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/cloudbytes/masters/academics/degree-type-list'] },
                { label: 'Degree', icon: 'pi pi-fw pi-tablet', routerLink: ['/home/cloudbytes/masters/academics/degree-list'] },
                { label: 'Program', icon: 'pi pi-fw pi-calendar', routerLink: ['/home/cloudbytes/masters/academics/program-list'] },
                { label: 'Operational Vertical', icon: 'pi pi-fw pi-calendar-times', routerLink: ['/home/cloudbytes/masters/academics/operational-vertical-list'] },
                { label: 'Program Specialization', icon: 'pi pi-fw pi-star', routerLink: ['/home/cloudbytes/masters/academics/program-specialization-list'] },
              ]
            },
            {
              label: 'Subjects', icon: 'pi pi-fw pi-bookmark', badgeStyleClass: 'text-badge',
              items: [
                { label: 'PaperType', icon: 'pi pi-fw pi-file', routerLink: ['/home/cloudbytes/masters/subjects/paper-type-list'] },
                { label: 'SubjectType', icon: 'pi pi-fw pi-tags', routerLink: ['/home/cloudbytes/masters/subjects/subject-type-list'] },
                { label: 'Subject', icon: 'pi pi-fw pi-bookmark', routerLink: ['/home/cloudbytes/masters/subjects/subject-list'] },
                { label: 'Subject Paper Code', icon: 'pi pi-fw pi-key', routerLink: ['/home/cloudbytes/masters/subjects/subject-paper-code-list'] },
                { label: 'Sub Module', icon: 'pi pi-fw pi-cog', routerLink: ['/home/cloudbytes/masters/subjects/paper-code-sub-module-manage'] }
              ]
            },
            {
              label: 'Accounts', icon: 'pi pi-fw pi-credit-card',
              items: [
                { label: 'Fee Components', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/masters/accounts/fee-component-list'] },
                { label: 'Concession Category', icon: 'pi pi-fw pi-tags', routerLink: ['/home/cloudbytes/masters/accounts/concession-category-list'] },
              ]
            },
            {
              label: 'Services', icon: 'pi pi-fw pi-th-large',
              items: [
                {
                  label: 'Service Request', icon: 'pi pi-fw pi-slack',
                  items: [
                    { label: 'Department', icon: 'pi pi-fw pi-ticket', routerLink: ['/home/cloudbytes/masters/service-request/department-list'] },
                    { label: 'Workgroup', icon: 'pi pi-fw pi-wallet', routerLink: ['/home/cloudbytes/masters/service-request/workgroup-list'] },
                    { label: 'Category', icon: 'pi pi-fw pi-window-maximize', routerLink: ['/home/cloudbytes/masters/service-request/category-list'] },
                    { label: 'Sub Category', icon: 'pi pi-fw pi-th-large', routerLink: ['/home/cloudbytes/masters/service-request/sub-category-list'] },
                    { label: 'Service Request Mapping', icon: 'pi pi-fw pi-table', routerLink: ['/home/cloudbytes/masters/service-request/mapping-list'] },
                  ]
                }
              ]
            },
            {
              label: 'HR', icon: 'pi pi-fw pi-tablet',
              items: [
                { label: 'Religion', icon: 'pi pi-fw pi-hashtag', routerLink: ['/home/cloudbytes/masters/hr/religion-list'] },
                { label: 'Caste', icon: 'pi pi-fw pi-tags', routerLink: ['/home/cloudbytes/masters/hr/caste-list'] },
                { label: 'Department', icon: 'pi pi-fw pi-building', routerLink: ['/home/cloudbytes/masters/hr/department-list'] },
                { label: 'Designation', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/cloudbytes/masters/hr/designation-list'] },
                { label: 'Identity Type', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/cloudbytes/masters/hr/identity-type-list'] },
              ]
            },
            {
              label: 'Infrastructure', icon: 'pi pi-fw pi-building',
              items: [
                { label: 'Building', icon: 'pi pi-fw pi-building', routerLink: ['/home/cloudbytes/masters/infrastructure/building-list'] },
                { label: 'Room', icon: 'pi pi-fw pi-home', routerLink: ['/home/cloudbytes/masters/infrastructure/room-list'] },
              ]
            },
            {
              label: 'Students', icon: 'pi pi-fw pi-users', badgeStyleClass: 'text-badge',
              items: [
                { label: 'Student Status', icon: 'pi pi-fw pi-check-square', routerLink: ['/home/cloudbytes/masters/student/student-status-description-list'] }
              ]
            },
            { label: 'Academics Holidays', icon: 'pi pi-fw pi-sun', routerLink: ['/home/cloudbytes/masters/academic-holidays-list'] }
          ]
        },

        {
          label: 'Transactions', icon: 'fas fa-cash-register', badgeStyleClass: 'text-badge',
          items: [
            {
              label: 'Academics', icon: 'pi pi-fw pi-book',
              items: [
                { label: 'Academic Session Program', icon: 'pi pi-fw pi-table', routerLink: ['/home/cloudbytes/transactions/academics/academic-session-program-list'] },
                { label: 'OVSubject', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-list'] },
                { label: 'OVSubjectImport', icon: 'pi pi-fw pi-clone', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-import'] },
                { label: 'OVS Configuration', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-configuration-list'] },
                { label: 'OVS Configuration import', icon: 'pi pi-fw pi-share-alt', routerLink: ['/home/cloudbytes/transactions/academics/operational-vertical-subject-configuration-import'] }
              ]
            },
            {
              label: 'Accounts', icon: 'pi pi-fw pi-credit-card',
              items: [

                { label: 'OV Fee', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/transactions/accounts/operational-vertical-fee-component-list'] },
                { label: 'OV Fee Component Import ', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/transactions/accounts/operational-vertical-fee-component-import-manage'] },
                { label: 'Concession Fee', icon: 'pi pi-fw pi-money-bill', routerLink: ['/home/cloudbytes/transactions/accounts/concession-fee-setup-list'] }
              ]
            },
          ]
        },
        // {
        //   label: 'Reports', icon: 'fas fa-file-lines', badgeStyleClass: 'text-badge',
        //   items: [
        //     {
        //       label: 'Academics', icon: 'pi pi-fw pi-credit-card',
        //       items: [
        //         {
        //           label: 'Academics', icon: 'pi pi-fw pi-credit-card',
        //         }
        //       ]
        //     },
        //     {
        //       label: 'Accounts', icon: 'pi pi-fw pi-credit-card',
        //       items: [
        //         {
        //           label: 'Accounts', icon: 'pi pi-fw pi-credit-card',
        //         }
        //       ]
        //     },
        //     {
        //       label: 'Users', icon: 'pi pi-fw pi-credit-card',
        //       items: [
        //         {
        //           label: 'Users', icon: 'pi pi-fw pi-credit-card',
        //         }
        //       ]
        //     }
        //   ]
        // },
      ];
    }
  }