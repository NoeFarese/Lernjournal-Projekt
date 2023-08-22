import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  showErrorMessage: boolean = false;
  isSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private registrationService: RegistrationService, private snackBar: MatSnackBar) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.showErrorMessage = true;
      const snackBarRef = this.snackBar.open('Email oder Passwort ist leer', 'Schließen', {
        duration: 3000,
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.showErrorMessage = false;
      });
      return;
    } else {
      this.checkIfEmailIsAlreadyInUse();
    }
  }

  private checkIfEmailIsAlreadyInUse() {
    const email = this.registrationForm.value.email;
    this.registrationService.getHttpResponseEmail(email).subscribe((exists) => {
      if (!exists) {
        this.createRegistration();
      } else {
        const snackBarRef = this.snackBar.open('Email wurde schon gebraucht', 'Schließen', {
          duration: 3000,
          verticalPosition: 'top',
        });
        snackBarRef.afterDismissed().subscribe(() => {
          this.showErrorMessage = false;
        });
      }
    });
  }

  private createRegistration() {
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;

    this.http.post('http://localhost:8080/registration', {
        email: email,
        password: password,
      }).subscribe(() => {
        this.isSuccess = true;
        const snackBarRef = this.snackBar.open('Du wurdest erfolgreich registriert', 'Schließen', {
        duration: 3000,
        verticalPosition: 'top',
      });
      snackBarRef.afterDismissed().subscribe(() => {
        this.isSuccess = false;
        this.registrationForm.reset();
      });
    });
  }
}
