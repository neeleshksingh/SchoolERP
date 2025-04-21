import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PeoplePulseComponent } from "../../layout/people-pulse/people-pulse.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: PeoplePulseComponent,

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
