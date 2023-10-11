import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "../Services/snackbar.service";
import { LoginService } from "../Services/login.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  form: FormGroup;
  isActualPasswordHidden: boolean = true;
  isNewPasswordHidden: boolean = true;
  isConfirmNewPasswordHidden: boolean = true;
  private readonly DURATION_MS = 3000;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, private loginService: LoginService) {
    this.form = this.formBuilder.group({
      actualPassword: ['', [Validators.required]],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  changeToNewPassword() {
    if (this.form.invalid) {
      this.snackBarService.openSnackbar('Bitte füllen Sie alle Felder aus', 'Schliessen', this.DURATION_MS);
    } else {
      const userEmail  = this.loginService.getUserEmail();
      const actualPassword = this.form.value.actualPassword;

      this.loginService.checkIfUserInputIsValid(userEmail, actualPassword).subscribe(
          (isValid: boolean) => {
            if (isValid) {
              const newPassword = this.form.value.newPassword;
              const confirmNewPassword = this.form.value.confirmNewPassword;

              if (newPassword === actualPassword) {
                this.snackBarService.openSnackbar('Das neue Passwort sollte sich vom aktuellen Passwort unterscheiden', 'Schliessen', this.DURATION_MS);
              } else if (newPassword === confirmNewPassword) {
                this.snackBarService.openSnackbar('Das neue Passwort stimmt nicht mit der Bestätigung überein', 'Schliessen', this.DURATION_MS);
              } else {
                this.loginService.updatePassword(userEmail, newPassword).subscribe(
                    () => {
                      this.snackBarService.openSnackbar('Passwort erfolgreich geändert', 'Schliessen', this.DURATION_MS);
                    },
                    (error: any) => {
                      console.error('Fehler beim Aktualisieren des Passworts', error);
                    }
                );
              }
            } else {
              this.snackBarService.openSnackbar('Das aktuelle Passwort ist nicht korrekt', 'Schliessen', this.DURATION_MS);
            }
          },
          (error) => {
            console.error('Fehler beim Überprüfen des aktuellen Passworts', error);
          }
      );
    }
  }

  toggleActualPasswordVisibility(): void {
    this.isActualPasswordHidden = !this.isActualPasswordHidden;
  }

  toggleNewPasswordVisibility(): void {
    this.isNewPasswordHidden = !this.isNewPasswordHidden;
  }

  toggleConfirmNewPasswordVisibility(): void {
    this.isConfirmNewPasswordHidden = !this.isConfirmNewPasswordHidden;
  }

}
