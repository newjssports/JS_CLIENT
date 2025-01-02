import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService, VerifyOTPRequest } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent {
  verification: VerifyOTPRequest = {USER_ID : 2,code : ''};
  errorMessage: string = '';
  mobOTP: string | null;
  constructor(private authService: AuthService, private router: Router) {
    this.mobOTP = this.authService.getOTP();
    // Temprary
    if(this.mobOTP != null){
      this.verification.code = this.mobOTP;
    }
    
  }

  onSubmitCode(){
    if(this.verification.USER_ID > 0){
      this.authService.verifyMobileOTP(this.verification).subscribe(
        (response: any) => {
          // Handle successful login and redirect to the dashboard
          this.authService.setToken(response.token);
          // Decode the token
          //const decoded = this.authService.getDecodedToken(response.token);
          //localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = 'Invalid OTP or Expired!';
        }
      );
    }else{

    }
   
  }
  
}
