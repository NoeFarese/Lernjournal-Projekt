import {Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "../Services/snackbar.service";
import { LoginService } from "../Services/login.service";
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordHidden: boolean = true;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
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
    this.snackBarService.openSnackbar('Du wurdest erfolgreich eingeloggt', 'Schliessen', 3000);
    this.loginForm.reset();

    this.loginService.getAuthorIdByEmail(email).subscribe((authorId) => {
      this.loginService.setAuthorId(authorId);
      this.loginService.setUserEmail(email);
    })

    const targetRoute = '/main';
    this.router.navigate([targetRoute], { relativeTo: this.route }).then(() => {
      window.location.reload();
    });
  }

  get isLoggedIn(): boolean {
    return this.loginService.getAuthorId() !== null;
  }

  logout(): void {
    this.loginService.clearAuthorId();
    this.snackBarService.openSnackbar('Du wurdest ausgeloggt', 'Schliessen', 3000);
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }
}
