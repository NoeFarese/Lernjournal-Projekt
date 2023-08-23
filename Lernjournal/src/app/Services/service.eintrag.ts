import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Eintrag} from "../Interfaces/Eintrag";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class ServiceEintrag{
  constructor(private http: HttpClient, private apiService: ApiService) {}
  private baseUrl = this.apiService.getBaseUrl();

  getEintragList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }

  getEintrag(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteEintrag(id: number): Observable<Eintrag> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Eintrag>(url, this.httpOptions).pipe(
      catchError(this.handleError<Eintrag>('deleteEintrag'))
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
}
