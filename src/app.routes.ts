import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { ProfileComponent } from './app/pages/student/profile/profile.component';
import { LoginComponent } from './app/pages/auth/components/login/login.component';
import { AuthGuard } from './app/shared/guard/auth-guard.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'modules', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'student', component: ProfileComponent},
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
];