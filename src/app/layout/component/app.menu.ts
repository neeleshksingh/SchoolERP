import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard'] }]
            },
            {
                label: 'Modules',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/modules'],
                items: [
                    { label: 'CoreX', icon: 'pi pi-fw pi-cog', routerLink: ['/home/modules/core-x/dashboard'] },
                    { label: 'LearnSphere', icon: 'pi pi-fw pi-book', routerLink: ['/home/modules/learn-sphere/dashboard'] },
                    { label: 'SmartPay', icon: 'pi pi-fw pi-wallet', routerLink: ['/home/modules/smart-pay/dashboard'] },
                    { label: 'AssessIQ', icon: 'pi pi-fw pi-check-square', routerLink: ['/home/modules/assess-iq/dashboard'] },
                    { label: 'PeoplePulse', icon: 'pi pi-fw pi-users', routerLink: ['/home/modules/people-pulse/dashboard'] },
                    { label: 'EnrollX', icon: 'pi pi-fw pi-user-plus', routerLink: ['/home/modules/enroll-x/dashboard'] },
                    { label: 'ServiceDesk', icon: 'pi pi-fw pi-headphones', routerLink: ['/home/modules/service-desk/dashboard'] },
                    { label: 'OpsCore', icon: 'pi pi-fw pi-briefcase', routerLink: ['/home/modules/ops-core/dashboard'] },
                    { label: 'Student Profile', icon: 'pi pi-fw pi-id-card', routerLink: ['modules/student'] },
                ]
            }
        ];
    }
}