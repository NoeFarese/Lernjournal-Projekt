import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationService} from "../Services/registration.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private registrationService: RegistrationService) {}

  login(): void {

  }
}
