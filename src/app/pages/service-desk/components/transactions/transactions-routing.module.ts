import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ServiceDeskComponent } from "../../layout/service-desk/service-desk.component";
import { SignUpComponent } from "./users/sign-up/sign-up.component";

const routes: Routes = [
    {
        path: '', component: ServiceDeskComponent,

        children: [
            { path: 'users/signup', component: SignUpComponent, data: { breadcrumb: 'SignUp' }, title: 'SignUp' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule { }
