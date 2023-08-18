import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegistrationService} from "../../core/registration.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  isBlank: boolean = false;
  isSuccess: boolean = false;
  isEmailAlreadyUsed: boolean = false;

  constructor(private http: HttpClient, private registrationService: RegistrationService) {}

  register(): void {
    if (this.email === '' || this.password === '') {
      console.log('Email oder Passwort ist leer');
      this.isBlank = true;

      setTimeout(() => {
        this.isBlank = false;
      }, 3000);

    } else {
      this.checkIfEmailIsAlreadyInUse();
    }
  }

  private checkIfEmailIsAlreadyInUse() {
    this.registrationService.getHttpResponseEmail(this.email).subscribe(exists => {
      this.isEmailAlreadyUsed = exists;

      if (!this.isEmailAlreadyUsed) {
        this.createRegistration();
        console.log('erfolgreich registriert');
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 3000);
      } else {
        console.log('email wurde schon verwendet');
        this.isSuccess = false;
        this.isEmailAlreadyUsed = true;

        setTimeout(() => {
          this.isEmailAlreadyUsed = false;
        }, 3000);
      }
    });
  }
  private createRegistration() {
    this.http.post('http://localhost:8080/registration', {
      email: this.email,
      password: this.password
    }).subscribe(() => {
      this.isSuccess = true;

      setTimeout(() => {
        this.isSuccess = false;
      }, 3000);
    });
  }
}

