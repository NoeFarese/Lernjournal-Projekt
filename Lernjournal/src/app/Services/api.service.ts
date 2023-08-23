import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   baseUrl = 'http://localhost:8080/registration';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
