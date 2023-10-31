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
  private baseUrl = this.apiService.getEintragUrl();

  getEintrag(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteEintrag(id: number): Observable<Eintrag> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Eintrag>(url, this.httpOptions).pipe(
      catchError(this.handleError<Eintrag>('deleteEintrag'))
    );
  }

  deleteAlleEintraege(authorId: string | null): Observable<any> {
    const url = `${this.baseUrl}/deleteAlleEintraege/${authorId}`;
    return this.http.delete<any>(url, this.httpOptions);
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

  getEintragListForUser(authorId: string): Observable<any> {
    const url = this.apiService.getEintragUrl();
    return this.http.get<any>(`${url}/getEintraege/${authorId}`);
  }

  getEintragListForAdmin(email: string): Observable<any> {
    const url = this.apiService.getEintragUrl();
    return this.http.get<any>(`${url}/getEintraegeByEmail/${email}`);
  }

  getAnzahlEintraege(authorId: string): Observable<number> {
    const url = `${this.apiService.getEintragUrl()}/getEintraege/${authorId}/count`;
    return this.http.get<number>(url);
  }

  checkTitleExists(title: string): Observable<boolean> {
    const url = `${this.apiService.getEintragUrl()}/checkTitle?title=${title}`;
    return this.http.get<boolean>(url);
  }
}
