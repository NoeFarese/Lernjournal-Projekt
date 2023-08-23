import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   baseUrl = 'http://localhost:8080/registration';
   eintragUrl = 'http://localhost:8080/eintrag';

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getEintragUrl(): string {
    return this.eintragUrl;
  }
}
