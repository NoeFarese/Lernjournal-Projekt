import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Eintrag} from "../Interfaces/Eintrag";
import {ApiService} from "./api.service";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})

export class ServiceEintrag{
  constructor(private http: HttpClient, private apiService: ApiService, private loginService: LoginService) {}
  private baseUrl = this.apiService.getEintragUrl();

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

  getEintragListForUser(authorId: number): Observable<Eintrag[]> {
    const url = this.apiService.getEintragUrl();
    return this.http.get<Eintrag[]>(`${url}/list?authorId=${authorId}`);
  }
}
