import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Registration} from "../Interfaces/Registration";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/registration';

  getRegistrationList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }

  getRegistrierung(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getEmailExists(email: string): Observable<any>{
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}/${email}/exists`);
  }

  deleteRegistration(id:number): Observable<Registration> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Registration>(url, this.httpOptions).pipe(
      catchError(this.handleError<Registration>('deleteEintrag'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  registrateUser(email: string, password: string): Observable<any>{
    return this.http.post('http://localhost:8080/registration', {
      email: email,
      password: password,
  }
  )}
}
