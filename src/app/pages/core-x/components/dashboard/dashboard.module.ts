import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../../../../shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        SharedModule,
        DashboardComponent,
        DashboardRoutingModule,
    ],
    declarations: [],
    providers: [],

    exports: [
        SharedModule,
        DashboardComponent,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }