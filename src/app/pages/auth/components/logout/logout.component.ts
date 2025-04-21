import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared.module';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/AuthenticationService';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../../../shared/models/idp/Login';

@Component({
  selector: 'app-logout',
  imports: [SharedModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  showConfirmation: boolean = false;
    private currentUserSubject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')!));
    currentUser: any;
    currentRole: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(user);

    this.currentUser.applicationUser.roles.forEach((element:any) => {
      this.currentRole = element;
    })
  }

  confirmLogout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }
}