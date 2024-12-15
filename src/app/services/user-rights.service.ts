import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockupDesignStepsUserRightsModel } from '../models/mockup-design-steps-user-rights.model';

@Injectable({
  providedIn: 'root'
})
export class UserRightsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUerMockupDesignActionRights(): Observable<MockupDesignStepsUserRightsModel[]> {
    
    return this.http.get<MockupDesignStepsUserRightsModel[]>(this.apiUrl+"UserMockupDesignRights/userMockupDesignActionRights");
  }
  //UserMockupDesignRights/userMockupDesignActionRights
}
