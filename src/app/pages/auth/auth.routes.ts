import { Routes } from '@angular/router';
import { Access } from './components/access';
import { Login } from './components/login';
import { Error } from './components/error';
import { LogoutComponent } from './components/logout/logout.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'logout', component: LogoutComponent }
] as Routes;