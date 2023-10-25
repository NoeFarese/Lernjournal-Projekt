import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "../Services/snackbar.service";
import { LoginService } from "../Services/login.service";
import { PersonService } from "../Services/person.service";
import { ServiceEintrag } from "../Services/service.eintrag";

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  form: FormGroup;
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  private readonly DURATION_MS = 3000;
  userEmail: string | null = '';
  authorId: string | null = '';

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, private loginService: LoginService, private personService: PersonService, private eintragService: ServiceEintrag) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userEmail = this.loginService.getUserEmail();
    this.authorId = this.loginService.getAuthorId();
  }

  deleteAccount(): void {
    const email = this.form.get('email');
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    if (this.form.invalid) {
      this.snackBarService.openSnackbar('Bitte füllen Sie alle Felder aus', 'Schliessen', this.DURATION_MS);
    } else if (password?.value !== confirmPassword?.value) {
      this.snackBarService.openSnackbar('Passwörter stimmen nicht überein', 'Schliessen', this.DURATION_MS);
    } else if (email?.value !== this.userEmail) {
      this.snackBarService.openSnackbar('Die eingegebene E-Mail stimmt nicht mit der aktuellen E-Mail überein', 'Schliessen', this.DURATION_MS);
    } else {
      this.loginService.checkIfUserInputIsValid(email?.value, password?.value).subscribe((isValid) => {
        if (isValid) {
          this.snackBarService.openSnackbar('Ihr Account wird jetzt gelöscht', 'Schliessen', this.DURATION_MS);
          this.deleteAndLogoutUser();
        } else {
          this.snackBarService.openSnackbar('E-Mail oder Passwort ist falsch', 'Schliessen', this.DURATION_MS);
        }
      });
    }
  }

  deleteAndLogoutUser(): void {
    setTimeout(() => {
      this.eintragService.deleteAlleEintraege(this.authorId);
      this.personService.deletePerson(this.userEmail);
      this.loginService.logoutWhenAccountDeleted();
    }, 3000);
  }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordHidden = !this.isConfirmPasswordHidden;
  }
}
