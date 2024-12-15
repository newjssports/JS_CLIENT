import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockupModel, MockupsListModel } from '../models/mockup.model';
import { AuthService } from './AuthService';
import { ApprovedMockupModel } from '../models/approved-mockups.model';
import { MockupDesignStepsNameModel } from '../models/mockup-design-steps-name.model';
import { MockupDesignStepsModel } from '../models/mockup-design-steps.model';

@Injectable({
  providedIn: 'root'
})
export class MockupService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient,private authService: AuthService) { }

  // Inside your service method where you make the API call

  addNewMockup(mockupData: MockupModel[]): Observable<any> {
    return this.http.post(this.apiUrl+"Mockup/addNewMockup", mockupData);
  }

  getMockupsClientRequest(): Observable<MockupsListModel[]> {
    return this.http.get<MockupsListModel[]>(this.apiUrl+"Mockup/getMockupsClientRequest");
  }
  getMockupsMoveToDesigningDepartment(): Observable<MockupsListModel[]> {
    return this.http.get<MockupsListModel[]>(this.apiUrl+"Mockup/getMockupsMoveToDesignDept");
  }
  getMockupsAssignToDesigner(): Observable<MockupsListModel[]> {
    return this.http.get<MockupsListModel[]>(this.apiUrl+"Mockup/getMockupsAssignToDesigner");
  }

  
  getApprovedMockups(): Observable<ApprovedMockupModel[]> {
    return this.http.get<ApprovedMockupModel[]>(this.apiUrl+"Mockup/getApprovedMockups");
  }

  getMockupDesignNames(): Observable<MockupDesignStepsNameModel[]> {
    return this.http.get<MockupDesignStepsNameModel[]>(this.apiUrl+"UserMockupDesignRights/getMockupDesignNames");
  }

  getMockupCreatedDesignedNames(): Observable<MockupDesignStepsNameModel[]> {
    return this.http.get<MockupDesignStepsNameModel[]>(this.apiUrl+"UserMockupDesignRights/getMockupDesignedNames");
  }


  createMockupStep(model:MockupDesignStepsNameModel): Observable<any> {
    const token = this.authService.getToken() ?? ''; // Default to empty string if token is null
    const headers = new HttpHeaders({
      'Custom-Header': 'your-header-value', // replace with your actual header
      'Authorization': token // if using JWT token
    });
  
    return this.http.post(this.apiUrl+"UserMockupDesignRights/createMockupStep", model, { headers: headers });
  }

  createMockupDesigningStep(model:MockupDesignStepsNameModel): Observable<any> {
    const token = this.authService.getToken() ?? ''; // Default to empty string if token is null
    const headers = new HttpHeaders({
      'Custom-Header': 'your-header-value', // replace with your actual header
      'Authorization': token // if using JWT token
    });
  
    return this.http.post(this.apiUrl+"UserMockupDesignRights/createMockupDesigningStep", model, { headers: headers });
  }

  getMockupDesignSteps(): Observable<MockupDesignStepsModel[]> {
    return this.http.get<MockupDesignStepsModel[]>(this.apiUrl+"UserMockupDesignRights/getMockupDesignSteps");
  }

}
