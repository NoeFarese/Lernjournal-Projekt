import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Person} from "../Interfaces/Person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getPersonenListeForAdmin(): Observable<Person[]>{
    const url = this.apiService.getBaseUrl();
    return this.http.get<Person[]>(`${url}/getPersonenListe`);
  }

  deletePerson(email: string | null): Observable<any> {
    const url = this.apiService.getBaseUrl();
    return this.http.get<any>(`${url}/deleteUserByEmail/${email}`);
  }
}
