import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/registration';

  getEmailExists(email: string): Observable<any>{
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}/${email}/exists`);
  }

  registrateUser(email: string, password: string): Observable<any>{
    return this.http.post('http://localhost:8080/registration', {
      email: email,
      password: password,
  }
  )}
}
