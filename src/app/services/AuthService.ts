import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environment/environment";
import { ICLoginModel, UserTokenModel, VerifyOTPRequest } from "../models/user.model";
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = environment.apiUrl;
    private tokenKey = 'authToken';  // The key used for localStorage
    constructor(private http: HttpClient) {}
  
    login(loginData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}Auth/login`, loginData);
    }

    icLogin(loginData: ICLoginModel): Observable<any> {
      return this.http.post(`${this.apiUrl}Auth/ic_login`, loginData);
    }

    verifyMobileOTP(verify: VerifyOTPRequest): Observable<any> {
      return this.http.post(`${this.apiUrl}VerifyOTP/verify-mobile-otp`, verify);
    }
     // Method to save the token to localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  
    isAuthenticated(): boolean {
      const token = localStorage.getItem(this.tokenKey);
      return token != null;
    }
      // Method to retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
    logout(): void {
      localStorage.removeItem(this.tokenKey);
    }

    // Get individual user properties from the decoded token
  getUserId(): number | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.UserId : null;
  }

  getUserName(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.UserName : null;
  }

  getICNumber(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.IcNumber : null;
  }

  getEmail(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.Email : null;
  }

  getMobileNumber(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.Mobile : null;
  }
  getUserType(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.UserType  : null;
  }

    // Decode the stored token to get user information
  getDecodedToken(): UserTokenModel | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<UserTokenModel>(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  }
  