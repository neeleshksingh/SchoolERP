import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AssessIQComponent } from "../../layout/assess-iq/assess-iq.component";

const routes: Routes = [
    {
        path: '', component: AssessIQComponent,

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
