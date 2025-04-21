import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../../shared/models/idp/Login';

@Component({
  selector: 'app-top-bar-profile',
  imports: [],
  templateUrl: './top-bar-profile.component.html',
  styleUrl: './top-bar-profile.component.scss'
})
export class TopBarProfileComponent {
  lastLoggedInUser: any;
  displayImageUrl: string = '';
  UserName: any;
  UserRole: any;
  defaultImage: string = '';

  private currentUserSubject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')!));
  currentUser: any;

  constructor(
    private router: Router,
    //private employeeDetailsService: EmployeeDetailsService
  ) { }

  ngOnInit(): void {
    // Initialize any necessary data or state here
    const lastLoggedInUserStr = localStorage.getItem("lastLoggedInUser");
        const currentUser = this.currentUserSubject.value;

        const user: any = localStorage.getItem('currentUser');
        this.currentUser = JSON.parse(user);


        if (currentUser && currentUser.applicationUser) {
            this.UserName = currentUser.applicationUser.displayName;
            const roles = currentUser.applicationUser.roles;
            this.UserRole = Array.isArray(roles) && roles.length > 0 ? roles[0] : 'No role assigned';
        }

        if (this.currentUser.applicationUser.gender === 'Male') {
            this.defaultImage = 'assets/images/male-user.svg';
        } else if (this.currentUser.applicationUser.gender === 'Female') {
            this.defaultImage = 'assets/images/female-user.svg';
        } else {
            this.defaultImage = 'assets/images/user.svg';
        }
        this.lastLoggedInUser = lastLoggedInUserStr ? JSON.parse(lastLoggedInUserStr) : { displayImageUrl: '', userName: '' };
        // this.employeeDetailsService.getByEmployeeCode(this.currentUser.applicationUser.uniqueUserCode).subscribe((data) => {
        //     this.displayImageUrl = data.employeePhotoUrl ?? ''
        // })

        this.displayImageUrl = this.lastLoggedInUser.displayImageUrl?.length > 0
            ? this.lastLoggedInUser.displayImageUrl
            : this.defaultImage;
  }

  logout() {
    this.router.navigate(['/auth/logout']);
  }

  toggleProfile(){
    this.router.navigate(['/home/modules/user-profile']);
  }
}