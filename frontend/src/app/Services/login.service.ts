import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private apiService: ApiService) { this.updateLastActivity(); }

  private readonly USER_EMAIL = 'userEmail';
  private readonly AUTHOR_ID = 'authorId';
  private lastActivity: number = Date.now();

  setUserEmail(email: string) {
    localStorage.setItem(this.USER_EMAIL, email);
  }

  getUserEmail() {
    return localStorage.getItem(this.USER_EMAIL);
  }

  setAuthorId(id: number) {
    localStorage.setItem(this.AUTHOR_ID, id.toString());
  }

  getAuthorIdByEmail(email: string): Observable<any> {
    const baseUrl = this.apiService.getEintragUrl();
     return this.http.get<HttpResponse<number>>(`${baseUrl}/findId/${email}`);
  }

  getAuthorId(){
    return localStorage.getItem(this.AUTHOR_ID);
  }

  checkIfUserInputIsValid(email: string, password: string): Observable<any> {
    const baseUrl = this.apiService.getBaseUrl();
    return this.http.get<HttpResponse<any>>(`${baseUrl}/userExists?email=${email}&password=${password}`);
  }

  clearAuthorId(): void {
    localStorage.removeItem(this.AUTHOR_ID);
  }

  setLoggedInState(isLoggedIn: boolean) {
    sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }

  isLoggedIn(): boolean {
    const loggedInState = sessionStorage.getItem('isLoggedIn');
    return loggedInState === 'true';
  }

  clearLoggedInState() {
    sessionStorage.removeItem('isLoggedIn');
  }

  updateLastActivity() {
    this.lastActivity = Date.now();
  }

  isInactive(): boolean {
    const currentTime: number = Date.now();
    const inactiveTime: number = currentTime - this.lastActivity;
    return inactiveTime > 300000;
  }
}
