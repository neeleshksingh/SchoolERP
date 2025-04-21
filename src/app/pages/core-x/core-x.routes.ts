import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', data: { breadcrumb: 'Dashboard' }, loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },

    // { path: 'forbidden-access', component: ForbiddenAccessComponent, data: { breadcrumb: 'Forbidden Access' } },
    // { path: 'login-token-expired', component: LoginTokenExpiredComponent, data: { breadcrumb: 'Login Token Expired' } },
    // { path: 'access-denied', component: AccessDeniedComponent, data: { breadcrumb: 'Access Denied' } },
    // { path: 'internal-server-error', component: InternalServerErrorComponent, data: { breadcrumb: 'Internal Server Error' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreXRoutingModule { }