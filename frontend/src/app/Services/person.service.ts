import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getPersonenListeForAdmin(email: string | null): Observable<any> {
    const url = this.apiService.getBaseUrl();
    return this.http.get<any>(`${url}/getPersonen/${email}`);
  }
}
