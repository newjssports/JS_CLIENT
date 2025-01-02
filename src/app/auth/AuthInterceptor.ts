import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from AuthService
    const isToken = this.authService.isAuthenticated();
    // If the token exisAuthInterceptorts, clone the request and add the Authorization header
    if (isToken) {
      const token = this.authService.getToken();
      const userId = this.authService.getUserId();
      const clonedRequest = req.clone({
        //withCredentials: true, // Add this for CORS with credentials
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);  // Forward the cloned request with the token
    } else {
      return next.handle(req);  // Forward the original request if no token is present
    }
}
}
