import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { Message } from 'primeng/message';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../../../shared/models/idp/Login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-desk',
  imports: [SharedModule],
  templateUrl: './service-desk.component.html',
  styleUrl: './service-desk.component.scss'
})
export class ServiceDeskComponent {
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
      { label: 'Dashboard', icon: 'fas fa-house-user', routerLink: ['/home/modules/service-desk/dashboard'] },
      {
        label: 'Masters', icon: 'pi pi-fw pi-id-card',
        items: [
          {
            label: 'Roles', icon: 'pi pi-fw pi-users', routerLink: ['/home/digitalfingers/masters/roles'],
            // items: [
            //   {
            //     label: 'Roles', icon: 'pi pi-fw pi-user-plus', routerLink: ['Transactions/Roles'],
            //   },

            // ]
          },

        ]
      },
      {
        label: 'Transactions', icon: 'pi pi-fw pi-exclamation-circle',
        items: [
          // {
          //   label: 'Roles', icon: 'pi pi-fw pi-users',routerLink: ['Transactions/Roles'],
          //   items: [
          //     {
          //       label: 'Roles', icon: 'pi pi-fw pi-user-plus', routerLink: ['Transactions/Roles'],
          //     },

          //   ]
          // },
          {
            label: 'Users', icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Sign up', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/modules/service-desk/transactions/users/signup'],
              },
              {
                label: 'Reset Password', icon: 'pi pi-fw pi-key', routerLink: ['/home/digitalfingers/transactions/reset-password'],
              },
              {
                label: 'User List', icon: 'pi pi-user-plus', routerLink: ['/home/digitalfingers/transactions/user-list']
              },
              {
                label: 'Import User', icon: 'pi pi-upload', routerLink: ['/home/digitalfingers/transactions/import-user']
              },
              {
                label: 'Assign Roles', icon: 'pi pi-user-edit', routerLink: ['/home/digitalfingers/transactions/user-roles']
              },
              {
                label: 'Lock Unlock User', icon: 'pi pi-unlock', routerLink: ['/home/digitalfingers/transactions/lock-users']
              },
            ]
          },
          {
            label: 'Service Request', icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Pending Request', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/digitalfingers/transactions/service-request-pending-view'],
              }
            ]
          }
        ]
      },
      {
        label: 'Reports', icon: 'pi pi-fw pi-bars',
      },
      {
        label: 'Create Ticket', icon: 'pi pi-fw pi-ticket',
      }
    ]
    }
  }