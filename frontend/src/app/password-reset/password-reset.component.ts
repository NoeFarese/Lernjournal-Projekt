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

  isFormValid() {
    return !this.form.invalid;
  }

  isNewPasswordDifferentFromCurrentPassword() {
    const newPassword = this.form.value.newPassword;
    const actualPassword = this.form.value.actualPassword;
    return newPassword !== actualPassword;
  }

  isNewPasswordMatchingConfirmation() {
    const newPassword = this.form.value.newPassword;
    const confirmNewPassword = this.form.value.confirmNewPassword;
    return newPassword === confirmNewPassword;
  }

  showSnackbar(message: string) {
    this.snackBarService.openSnackbar(message, 'Schliessen', this.DURATION_MS);
  }

  updatePassword(userEmail: string | null, newPassword: string) {
    return this.loginService.updatePassword(userEmail, newPassword);
  }

  checkUserInput() {
    const userEmail = this.loginService.getUserEmail();
    const actualPassword = this.form.value.actualPassword;

    return this.loginService.checkIfUserInputIsValid(userEmail, actualPassword);
  }

  changeToNewPassword() {
    if (this.isFormValid()) {
      this.checkUserInput().subscribe(
          (isValid: boolean) => {
            if (isValid) {
              if (this.isNewPasswordDifferentFromCurrentPassword()) {
                if (this.isNewPasswordMatchingConfirmation()) {
                  const userEmail = this.loginService.getUserEmail();
                  const newPassword = this.form.value.newPassword;

                  this.updatePassword(userEmail, newPassword).subscribe(
                      () => {
                        this.showSnackbar('Passwort erfolgreich geändert');

                        setTimeout(() => {
                          this.form.reset();
                        }, 3500);
                      },
                      (error: any) => {
                        console.error('Fehler beim Aktualisieren des Passworts', error);
                        this.form.reset();
                      }
                  );
                } else {
                  this.showSnackbar('Das neue Passwort stimmt nicht mit der Bestätigung überein');
                  this.form.reset();
                }
              } else {
                this.showSnackbar('Das neue Passwort sollte sich vom aktuellen Passwort unterscheiden');
                this.form.reset();
              }
            } else {
              this.showSnackbar('Das aktuelle Passwort ist nicht korrekt');
              this.form.reset();
            }
          },
          (error) => {
            console.error('Fehler beim Überprüfen des aktuellen Passworts', error);
            this.form.reset();
          }
      );
    } else {
      this.showSnackbar('Bitte füllen Sie alle Felder aus');
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
