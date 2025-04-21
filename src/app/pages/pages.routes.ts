import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { ProfileComponent } from './student/profile/profile.component';
import { UserProfileComponent } from './global/user-profile/user-profile.component';

export default [
    {
        path: 'core-x',
        loadChildren: () => import('./core-x/core-x.module').then(m => m.CoreXModule)
    },
    {
        path: 'service-desk',
        loadChildren: () => import('./service-desk/service-desk.module').then(m => m.ServiceDeskModule)
    },    
    {
        path: 'assess-iq',
        loadChildren: () => import('./assess-iq/assess-iq.module').then(m => m.AssessIQModule)
    },    
    {
        path: 'enroll-x',
        loadChildren: () => import('./enroll-x/enroll-x.module').then(m => m.EnrollXModule)
    },
    {
        path: 'learn-sphere',
        loadChildren: () => import('./learn-sphere/learn-sphere.module').then(m => m.LearnSphereModule)
    },
    {
        path: 'ops-core',
        loadChildren: () => import('./ops-core/ops-core.module').then(m => m.OpsCoreModule)
    },
    {
        path: 'people-pulse',
        loadChildren: () => import('./people-pulse/people-pulse.module').then(m => m.PeoplePulseModule)
    },
    {
        path: 'smart-pay',
        loadChildren: () => import('./smart-pay/smart-pay.module').then(m => m.SmartPayModule)
    },
    { path: 'student', component: ProfileComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
