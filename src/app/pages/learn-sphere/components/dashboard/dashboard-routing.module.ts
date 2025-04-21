import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LearnSphereComponent } from "../../layout/learn-sphere/learn-sphere.component";

const routes: Routes = [
    {
        path: '', component: LearnSphereComponent,

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
