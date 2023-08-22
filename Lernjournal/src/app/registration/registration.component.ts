import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../Services/registration.service';
import { SnackbarService } from "../Services/snackbar.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService,  private snackBarService: SnackbarService) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.snackBarService.openSnackbar('Email oder Passwort ist leer', 'Schließen', 3000);
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
        this.snackBarService.openSnackbar('User existiert schon', 'Schließen', 3000);
      }
    });
  }

  private createRegistration(email: string, password: string) {
    this.registrationService.registrateUser(email, password).subscribe(() => {
      this.snackBarService.openSnackbar('Du wurdest erfolgreich registriert', 'Schließen', 3000);
      this.registrationForm.reset();
    });
  }
}
