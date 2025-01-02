import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICLoginModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginData = { username: '', password: '' };
  icLogin: ICLoginModel = {icNumber : ''};
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  
  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        // Handle successful login and redirect to the dashboard
        //this.authService.setToken(response.token);
        //localStorage.setItem('token', response.token);
        this.router.navigate(['/verify']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
  onSubmitICNumber(){
    this.authService.icLogin(this.icLogin).subscribe(
      (response: any) => {
        // Handle successful login and redirect to the dashboard
        this.authService.setOTP(response.otp);
        this.authService.setToken(response.token);
        //localStorage.setItem('token', response.token);
        this.router.navigate(['/authentication/verify']);
      },
      (error) => {
        this.errorMessage = 'Invalid IC Number Or User not created!';
      }
    );
  }
}
