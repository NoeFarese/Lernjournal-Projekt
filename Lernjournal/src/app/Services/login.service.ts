import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  setAuthorId(id: number) {
    localStorage.setItem('authorId', id.toString());
  }

  getAuthorIdByEmail(email: string): Observable<any> {
    const baseUrl = this.apiService.getEintragUrl();
     return this.http.get<HttpResponse<number>>(`${baseUrl}/findId/${email}`);
  }

  getAuthorId(){
    return localStorage.getItem('authorId');
  }

  checkIfUserInputIsValid(email: string, password: string): Observable<any> {
    const baseUrl = this.apiService.getBaseUrl();
    return this.http.get<HttpResponse<any>>(`${baseUrl}/userExists?email=${email}&password=${password}`);
  }
}
