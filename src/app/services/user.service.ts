import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ClientUserList } from '../models/user.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/new-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientUserList(): Observable<ClientUserList[]> {
    return this.http.get<ClientUserList[]>(this.apiUrl+"User/clientList");
  }

   // POST request to register user
   registerUser(model: RegisterModel): Observable<any> {
    return this.http.post<any>(this.apiUrl+"Auth/register", model);
  }
}
