import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../Services/registration.service';
import { SnackbarService } from "../Services/snackbar.service";
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService,  private snackBarService: SnackbarService, private route: ActivatedRoute, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,  Validators.minLength(8)],
      confirmPassword: ['', Validators.required]
    });
  }

  register(): void {
    const password = this.registrationForm.get('password');
    const confirmPassword = this.registrationForm.get('confirmPassword');

    if (this.registrationForm.invalid) {
      this.snackBarService.openSnackbar('Bitte füllen Sie alle Felder aus', 'Schließen', this.DURATION_MS);
    } else if (password?.value !== confirmPassword?.value) {
      this.snackBarService.openSnackbar('Passwörter stimmen nicht überein', 'Schließen', this.DURATION_MS);
    } else if (password?.value.length < 8) {
      this.snackBarService.openSnackbar('Passwort muss mindestens 8 Zeichen haben', 'Schließen', this.DURATION_MS);
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
    const isAdmin = false;
    this.registrationService.registrateUser(email, password, isAdmin).subscribe(() => {
      this.snackBarService.openSnackbar('Du wurdest erfolgreich registriert', 'Schließen', this.DURATION_MS);
      this.registrationForm.reset();

      setTimeout(() => {
        const targetRoute = '/login';
        this.router.navigate([targetRoute], { relativeTo: this.route }).then(() => {
          window.location.reload();
        });
      }, 3500);
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
  }
}
