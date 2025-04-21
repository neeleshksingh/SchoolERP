import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../../shared.module';
import { LoginRequest, RequestOTP, UpdatePassword, UserLogin, ValidateOTP } from '../../../../shared/models/idp/Login';
import { AuthenticationService } from '../../services/AuthenticationService';
import { environment } from '../../../../../environment/environment';

enum LoginMode {
  DEFAULT = 'default',
  OTP = 'otp',
  FORGOT_PASSWORD = 'forgot_password'
}

enum ForgotPasswordStep {
  USERNAME = 'username',
  OTP = 'otp',
  NEW_PASSWORD = 'new_password'
}

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  LoginMode = LoginMode;
  ForgotPasswordStep = ForgotPasswordStep;
  rememberMe: boolean = false;

  currentMode: LoginMode = LoginMode.DEFAULT;
  forgotPasswordStep: ForgotPasswordStep = ForgotPasswordStep.USERNAME;

  defaultLoginForm: FormGroup = new FormGroup({});
  otpLoginForm: FormGroup = new FormGroup({});
  forgotPasswordForm: FormGroup = new FormGroup({});

  loginMessage: string = '';
  isLoading: boolean = false;
  imageUrl: string = '';
  slogan: string = '';
  title: string = '';
  city: string = '';
  supportEmailId: string = '';
  alertMessage: string = '';
  displayImageUrl: string = '';
  lastLoggedInUser: any;
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // Handle browser refresh flag
    const isBrowserNeedsRefresh = localStorage.getItem("IsBrowserNeedsRefresh");
    if (isBrowserNeedsRefresh === "true") {
      localStorage.setItem("IsBrowserNeedsRefresh", "false");
      window.location.reload();
    }

    // Redirect if already logged in
    if (this.authenticationService.currentUserValue?.tokenInfo) {
      this.router.navigateByUrl('/home/dashboard');
    }

    // Get geolocation
    this.authenticationService.getPosition().subscribe(pos => {
      console.log(pos);
    });

    // Set partner details
    const matchedPartner = environment.partner;
    this.imageUrl = matchedPartner.logo_url;
    this.slogan = matchedPartner.sloganText;
    this.title = matchedPartner.title;
    this.city = matchedPartner.city;
    this.alertMessage = matchedPartner.alertMessage;
    this.supportEmailId = matchedPartner.supportEmailId;

    // Handle last logged in user
    const lastLoggedInUserStr = localStorage.getItem("lastLoggedInUser") ?? "";
    if (lastLoggedInUserStr?.length > 0) {
      this.lastLoggedInUser = JSON.parse(lastLoggedInUserStr);
      if (!this.lastLoggedInUser) {
        this.lastLoggedInUser = { displayImageUrl: this.imageUrl, userName: '' };
      }
    } else {
      this.lastLoggedInUser = { displayImageUrl: this.imageUrl, userName: '' };
    }

    this.displayImageUrl = this.lastLoggedInUser.displayImageUrl?.length > 0 
      ? this.lastLoggedInUser.displayImageUrl 
      : 'assets/layout/images/icon-profile.png';

    this.initForms();
  }

  initForms(): void {
    this.defaultLoginForm = this.fb.group({
      userName: [this.lastLoggedInUser?.userName || '', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.otpLoginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });

    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  switchMode(mode: LoginMode): void {
    this.currentMode = mode;
    this.loginMessage = '';
    if (mode === LoginMode.FORGOT_PASSWORD) {
      this.forgotPasswordStep = ForgotPasswordStep.USERNAME;
    }
  }

  onDefaultLoginSubmit(): void {
    if (this.defaultLoginForm.valid) {
      this.isLoading = true;
      const loginRequest: LoginRequest = {
        userName: this.defaultLoginForm.value.userName,
        password: this.defaultLoginForm.value.password
      };

      this.authenticationService.signIn(loginRequest).subscribe({
        next: (response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('lastLoggedInUser', JSON.stringify({
            displayImageUrl: response?.applicationUser?.displayImageUrl,
            userName: response?.applicationUser?.userName
          }));

          const userRole = response?.applicationUser?.roles?.[0] ?? '';
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 
            (userRole.toUpperCase() === 'STUDENT' ? '/Home/Students/Dashboard' : '/home/dashboard');

          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.isLoading = false;
          this.loginMessage = error.error.detail || error.error.Message || 'Internal Server Error!';
          
          if (this.loginMessage.includes('User ') && this.loginMessage.includes(', Invalid credentials.')) {
            const start_index = this.loginMessage.indexOf('User ') + 'User '.length;
            const end_index = this.loginMessage.indexOf(', Invalid credentials.');
            const extracted_part = this.loginMessage.substring(start_index, end_index);
            if (this.defaultLoginForm.controls['userName'].value !== extracted_part) {
              this.loginMessage = "Incorrect Username";
            }
          }
        }
      });
    } else {
      this.defaultLoginForm.markAllAsTouched();
    }
  }

  requestLoginOTP(): void {
    const phoneNumber = this.otpLoginForm.get('phoneNumber')?.value;
    if (phoneNumber && this.otpLoginForm.get('phoneNumber')?.valid) {
      this.isLoading = true;
      const payload: RequestOTP = {
        phoneNumber: phoneNumber,
        OTP: "123456"
      };

      this.authenticationService.sendOTPToUserPhoneNumber(payload).subscribe({
        next: () => {
          this.isLoading = false;
          this.loginMessage = '';
        },
        error: (error) => {
          this.isLoading = false;
          this.loginMessage = error.error.message || 'Failed to send OTP';
        }
      });
    } else {
      this.otpLoginForm.get('phoneNumber')?.markAsTouched();
    }
  }

  onOTPLoginSubmit(): void {
    if (this.otpLoginForm.valid) {
      this.isLoading = true;
      const payload: ValidateOTP = {
        phoneNumber: this.otpLoginForm.value.phoneNumber,
        otp: this.otpLoginForm.value.otp
      };

      this.authenticationService.LoginWithOTP(payload).subscribe({
        next: (response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('lastLoggedInUser', JSON.stringify({
            displayImageUrl: response?.applicationUser?.displayImageUrl,
            userName: response?.applicationUser?.userName
          }));

          const userRole = response.applicationUser?.roles?.[0] ?? '';
          const returnUrl = userRole.toUpperCase() === 'STUDENT' 
            ? '/Home/Students/Dashboard' 
            : '/home/dashboard';

          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.isLoading = false;
          this.loginMessage = error.error.Message || 'Invalid OTP';
        }
      });
    } else {
      this.otpLoginForm.markAllAsTouched();
    }
  }

  submitForgotPasswordStep(): void {
    if (this.forgotPasswordStep === ForgotPasswordStep.USERNAME) {
      if (this.forgotPasswordForm.get('username')?.valid) {
        this.isLoading = true;
        const payload: UserLogin = {
          userName: this.forgotPasswordForm.value.username
        };
        this.username = this.forgotPasswordForm.value.username;

        this.authenticationService.SendOtpForgotPasswordOtpRequest(payload).subscribe({
          next: () => {
            this.isLoading = false;
            this.loginMessage = '';
            this.forgotPasswordStep = ForgotPasswordStep.OTP;
          },
          error: (error) => {
            this.isLoading = false;
            this.loginMessage = error.error.message || 'Failed to send OTP';
          }
        });
      } else {
        this.forgotPasswordForm.get('username')?.markAsTouched();
      }
    } else if (this.forgotPasswordStep === ForgotPasswordStep.OTP) {
      if (this.forgotPasswordForm.get('otp')?.valid) {
        this.isLoading = true;
        // Note: Old code doesn't validate OTP separately, so we move to next step
        this.isLoading = false;
        this.forgotPasswordStep = ForgotPasswordStep.NEW_PASSWORD;
      } else {
        this.forgotPasswordForm.get('otp')?.markAsTouched();
      }
    } else if (this.forgotPasswordStep === ForgotPasswordStep.NEW_PASSWORD) {
      if (this.forgotPasswordForm.get('newPassword')?.valid &&
          this.forgotPasswordForm.get('confirmPassword')?.valid &&
          !this.forgotPasswordForm.hasError('passwordMismatch')) {
        this.isLoading = true;
        const payload: UpdatePassword = {
          userName: this.username,
          phoneNumber: "0123456789",
          otp: this.forgotPasswordForm.value.otp,
          password: this.forgotPasswordForm.value.newPassword
        };

        this.authenticationService.UpdatePasswordByForgotPasswordUpdateRequest(payload).subscribe({
          next: () => {
            this.isLoading = false;
            this.loginMessage = "Password changed successfully";
            this.currentMode = LoginMode.DEFAULT;
          },
          error: (error) => {
            this.isLoading = false;
            this.loginMessage = this.getPasswordErrorMessage(error);
          }
        });
      } else {
        this.forgotPasswordForm.markAllAsTouched();
      }
    }
  }

  private getPasswordErrorMessage(error: any): string {
    const errorMessage = error.error.Message;
    if (errorMessage === 'Object reference not set to an instance of an object.') {
      return 'OTP is incorrect, please enter correct OTP';
    } else if (errorMessage.includes('PasswordRequiresNonAlphanumeric')) {
      return 'Password must contain at least one non-alphanumeric character';
    } else if (errorMessage.includes('PasswordRequiresUpper')) {
      return "Passwords must have at least one uppercase ('A'-'Z')";
    } else if (errorMessage.includes('PasswordTooShort')) {
      return "Passwords must be at least 6 characters";
    }
    return errorMessage || 'Failed to update password';
  }
}