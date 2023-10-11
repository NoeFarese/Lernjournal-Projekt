import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { SnackbarService } from "./snackbar.service";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private apiService: ApiService, private snackBarService: SnackbarService, private router: Router, private route: ActivatedRoute) {}

  private readonly USER_EMAIL = 'userEmail';
  private readonly AUTHOR_ID = 'authorId';

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

  checkIfUserInputIsValid(email: string | null, password: string): Observable<any> {
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

  logout(): void {
    this.clearAuthorId();
    this.clearLoggedInState();

    const targetRoute = '/login';
    this.router.navigate([targetRoute], { relativeTo: this.route}).then(() => {
      window.location.reload();
    })

    this.snackBarService.openSnackbar('Du wurdest ausgeloggt', 'Schliessen', 3000);
  }

  updatePassword(userEmail: string | null, newPassword: string): Observable<any> {
    const baseUrl = this.apiService.getBaseUrl();
    const url = `${baseUrl}/updatePassword?email=${userEmail}&newPassword=${newPassword}`;
    return this.http.put<HttpResponse<any>>(url, null);
  }
}
