import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getEmailExists(email: string): Observable<any>{
    const baseUrl = this.apiService.getBaseUrl();
    return this.http.get<HttpResponse<any>>(`${baseUrl}/${email}/exists`);
  }

  registrateUser(email: string, password: string): Observable<any>{
    return this.http.post('http://localhost:8080/registration', {
      email: email,
      password: password,
  }
  )}
}
