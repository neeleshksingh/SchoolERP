import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServiceDeskComponent } from "../../layout/service-desk/service-desk.component";

const routes: Routes = [
    {
        path: '', component: ServiceDeskComponent,

        children: [
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }, title: 'Dashboard' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
