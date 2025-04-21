import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RequestOTP, UpdatePassword, UserLogin, ValidateOTP } from '../../../shared/models/idp/Login';
import { environment } from '../../../../environment/environment';
import { ApplicationUser } from '../../../shared/models/idp/UserAccount';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    challengePasswordResponse: any;

    private currentUserSubject: BehaviorSubject<LoginResponse>;
    public currentUser: Observable<LoginResponse>;
    loginResponse: LoginResponse;

    constructor(private httpClient: HttpClient) {
        this.loginResponse = new LoginResponse();

        var data = localStorage.getItem('currentUser');
        if (data) {
            this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
        }
        else {
            this.currentUserSubject = new BehaviorSubject<LoginResponse>(new LoginResponse());
        }

        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): LoginResponse {
        return this.currentUserSubject.value;
    }

    getUserProfile(): Observable<ApplicationUser> {
        return this.httpClient.get<ApplicationUser>(environment.identityServerUrl + '/Account/GetApplicationUser');
    }

    logout() {

        var lastLoggedInUserStr = localStorage.getItem("lastLoggedInUser");
        var lastLoggedInUser = JSON.parse(lastLoggedInUserStr || '{}');

        // localStorage.clear();
        // sessionStorage.clear();
        localStorage.removeItem('currentUser');
        localStorage.setItem('lastLoggedInUser', JSON.stringify({ displayImageUrl: lastLoggedInUser.displayImageUrl, userName: lastLoggedInUser.userName, }));
        this.currentUserSubject.next(null as any);
    }

    signIn(loginRequest: LoginRequest) {
        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'TimezoneOffset': String(new Date().getTimezoneOffset())
        //     })
        // };
        return this.httpClient.post<LoginResponse>(environment.identityServerUrl + '/Account/SignIn', loginRequest);
    }

    sendOTPToUserPhoneNumber(payload: RequestOTP) {
        return this.httpClient.post(environment.identityServerUrl + '/Account/SendOTPToUserPhoneNumber', payload);
    }

    LoginWithOTP(payload: ValidateOTP) {
        return this.httpClient.post<LoginResponse>(environment.identityServerUrl + '/Account/LoginWithOTP', payload);
    }

    ///Account/SendOtpForgotPasswordOtpRequest
    SendOtpForgotPasswordOtpRequest(payload: UserLogin) {
        return this.httpClient.post(environment.identityServerUrl + '/Account/SendOtpForgotPasswordOtpRequest', payload);
    }
    UpdatePasswordByForgotPasswordUpdateRequest(payload: UpdatePassword) {
        return this.httpClient.post(environment.identityServerUrl + '/Account/UpdatePasswordByForgotPasswordUpdateRequest', payload);
    }

    getPosition(): Observable<any> {
        return Observable.create((observer : any) => {
            window.navigator.geolocation.getCurrentPosition(position => {
                observer.next(position);
                observer.complete();
            },
                error => observer.error(error));
        });
    }
}
