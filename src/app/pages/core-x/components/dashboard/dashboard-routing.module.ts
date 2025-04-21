import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CoreXComponent } from "../../layout/core-x/core-x.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: CoreXComponent,

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
