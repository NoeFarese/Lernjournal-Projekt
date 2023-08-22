import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../Services/registration.service';
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

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService, private snackBar: MatSnackBar) {
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
    } else {
      this.checkIfEmailIsAlreadyInUse();
    }
  }

  private checkIfEmailIsAlreadyInUse() {
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;

    this.registrationService.getEmailExists(email).subscribe((exists) => {
      if (!exists) {
        this.createRegistration(email, password);
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

  private createRegistration(email: string, password: string) {
    this.registrationService.registrateUser(email, password).subscribe(() => {
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
