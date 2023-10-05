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
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  private readonly DURATION_MS = 3000;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService,  private snackBarService: SnackbarService) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.snackBarService.openSnackbar('Bitte füllen Sie alle Felder aus', 'Schließen', this.DURATION_MS);
    } else if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
      this.snackBarService.openSnackbar('Passwörter stimmen nicht überein', 'Schließen', this.DURATION_MS);
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
        this.snackBarService.openSnackbar('User existiert schon', 'Schließen', this.DURATION_MS);
      }
    });
  }

  private createRegistration(email: string, password: string) {
    this.registrationService.registrateUser(email, password).subscribe(() => {
      this.snackBarService.openSnackbar('Du wurdest erfolgreich registriert', 'Schließen', this.DURATION_MS);
      this.registrationForm.reset();
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
  }
}
