import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EnrollXComponent } from "../../layout/enroll-x/enroll-x.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: EnrollXComponent,

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
