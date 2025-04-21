import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '../../../../../../../shared.module';
import { countryList, genderList, maritalStatusList, statusList } from '../../../../../../shared/models/commons/selectItems';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    SharedModule
  ],
  providers: [MessageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  showOtpDialog: boolean = false;
  otpForm!: FormGroup;
  loading: boolean = false;
  uploadedImage: any = null;
  previewImageSrc: string = '';
  genderOptions:SelectItem[] = genderList;

  maritalStatusOptions: SelectItem[] = maritalStatusList;

  countryOptions: SelectItem[] = countryList;

  roleOptions = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Student', value: 'Student' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Staff', value: 'Staff' }
    // Add more roles as needed
  ];

  statusOptions : SelectItem[] = statusList;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initSignupForm();
    this.initOtpForm();
  }

  initSignupForm() {
    this.signupForm = this.fb.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      displayName: [''],
      displayImageUrl: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      dateOfBirth: [''],
      maritalStatus: ['Single'],
      country: ['India'],
      userTimeZone: ['GMT+05:30'],
      preferredLanguage: ['en'],
      status: ['PUBLISHED'],
      roles: [[]]
    });

    // Auto-populate display name when first, middle, or last name changes
    this.signupForm.get('firstName')?.valueChanges.subscribe(() => this.updateDisplayName());
    this.signupForm.get('middleName')?.valueChanges.subscribe(() => this.updateDisplayName());
    this.signupForm.get('lastName')?.valueChanges.subscribe(() => this.updateDisplayName());
  }

  initOtpForm() {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  updateDisplayName() {
    const firstName = this.signupForm.get('firstName')?.value || '';
    const middleName = this.signupForm.get('middleName')?.value || '';
    const lastName = this.signupForm.get('lastName')?.value || '';
    
    let displayName = firstName;
    if (middleName) {
      displayName += ' ' + middleName;
    }
    if (lastName) {
      displayName += ' ' + lastName;
    }
    
    this.signupForm.get('displayName')?.setValue(displayName);
  }

  onImageUpload(event: any) {
    if (event.files && event.files.length > 0) {
      this.uploadedImage = event.files[0];
      
      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageSrc = e.target.result;
      };
      reader.readAsDataURL(this.uploadedImage);
      
      // Update the form with the file name (or you could upload and get a URL)
      this.signupForm.get('displayImageUrl')?.setValue(this.uploadedImage.name);
      
      this.messageService.add({
        severity: 'info',
        summary: 'Image Selected',
        detail: `${this.uploadedImage.name} is ready to upload`
      });
    }
  }

  onImageClear() {
    this.uploadedImage = null;
    this.previewImageSrc = '';
    this.signupForm.get('displayImageUrl')?.setValue('');
  }

  onSendOTP() {
    if (this.signupForm.get('phoneNumber')?.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter a valid phone number'
      });
      return;
    }

    this.loading = true;
    const phoneNumber = this.signupForm.get('phoneNumber')?.value;
    
    // Call OTP API
    this.http.post('api/sendotp', { phoneNumber }).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.showOtpDialog = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'OTP sent successfully'
        });
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send OTP. Please try again.'
        });
        console.error('Error sending OTP:', error);
      }
    });
  }

  onVerifyOTP() {
    if (this.otpForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error', 
        detail: 'Please enter a valid OTP'
      });
      return;
    }

    this.loading = true;
    const phoneNumber = this.signupForm.get('phoneNumber')?.value;
    const otp = this.otpForm.get('otp')?.value;
    
    // Call verify OTP API
    this.http.post('api/verifyotp', { phoneNumber, otp }).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'OTP verified successfully'
        });
        
        // Proceed with signup
        this.signupUser();
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid OTP. Please try again.'
        });
        console.error('Error verifying OTP:', error);
      }
    });
  }

  signupUser() {
    if (this.signupForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly'
      });
      return;
    }

    const userData = this.signupForm.value;
    userData.otp = this.otpForm.get('otp')?.value;
    
    this.loading = true;
    
    // Call signup API
    this.http.post('api/signup', userData).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.showOtpDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User registered successfully'
        });
        this.signupForm.reset();
        this.otpForm.reset();
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to register user. Please try again.'
        });
        console.error('Error registering user:', error);
      }
    });
  }

  closeOtpDialog() {
    this.showOtpDialog = false;
    this.otpForm.reset();
  }
}