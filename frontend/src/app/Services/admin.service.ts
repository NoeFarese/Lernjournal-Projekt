import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: ApiService, private http: HttpClient) {}

  isUserAdmin(email: string | null): Observable<any> {
    const baseUrl = this.apiService.getBaseUrl();
    return this.http.get<HttpResponse<any>>(`${baseUrl}/isAdmin?email=${email}`);
  }
}