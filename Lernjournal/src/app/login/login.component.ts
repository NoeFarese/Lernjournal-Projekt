import {Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "../Services/snackbar.service";
import { LoginService } from "../Services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggendIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.snackBarService.openSnackbar('Email oder Passwort nicht gültig', 'Schliessen', 3000);
    } else {
      this.checkIfLoginDataIsCorrect();
    }
  }

  private checkIfLoginDataIsCorrect(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.checkIfUserInputIsValid(email, password).subscribe((exists) => {
      if (exists) {
        this.loginUser(email);
      } else {
        this.snackBarService.openSnackbar('Email oder Passwort ist falsch', 'Schliessen', 3000);
      }
    });
  }

  loginUser(email: string) {
    this.isLoggendIn = true;
    this.snackBarService.openSnackbar('Du wurdest erfolgreich eingeloggt', 'Schliessen', 3000);
    this.loginForm.reset();

    this.loginService.getAuthorIdByEmail(email).subscribe((authorId) => {
      this.loginService.setAuthorId(authorId);
      console.log(this.loginService.getAuthorId());
    })
  }

  get isLoggedIn(): boolean {
    return this.loginService.getAuthorId() !== null;
  }

  logout(): void {
    this.isLoggendIn = false;
    this.loginService.clearAuthorId();
    this.snackBarService.openSnackbar('Du wurdest ausgeloggt', 'Schließen', 3000);
  }
}
