import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "../Services/snackbar.service";
import { LoginService } from "../Services/login.service";
import { Router, ActivatedRoute} from "@angular/router";
import { interval } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  passwordHidden: boolean = true;
  private readonly DURATION_MS = 3000;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    interval(5000).subscribe(() => {
      this.checkInactivity();
    });
  }

  login(): void {
    if (this.isLoginFormValid()) {
      this.checkIfLoginDataIsCorrect();
    }
  }

  private isLoginFormValid(): boolean {
    if (this.loginForm.invalid) {
      this.snackBarService.openSnackbar('Email oder Passwort nicht gültig', 'Schliessen', this.DURATION_MS);
      return false;
    }
    return true;
  }


  private checkIfLoginDataIsCorrect(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.checkIfUserInputIsValid(email, password).subscribe((exists) => {
      if (exists) {
        this.loginUser(email);
      } else {
        this.snackBarService.openSnackbar('Email oder Passwort ist falsch', 'Schliessen', this.DURATION_MS);
      }
    });
  }

  loginUser(email: string) {
    this.snackBarService.openSnackbar('Du wurdest erfolgreich eingeloggt', 'Schliessen', this.DURATION_MS);
    this.loginForm.reset();

    this.loginService.getAuthorIdByEmail(email).subscribe((authorId) => {
      this.loginService.setAuthorId(authorId);
      this.loginService.setUserEmail(email);

      const targetRoute = '/main';
      this.router.navigate([targetRoute], { relativeTo: this.route }).then(() => {
        window.location.reload();
      });
    })
  }

  get isLoggedIn(): boolean {
    return this.loginService.getAuthorId() !== null;
  }

  logout(): void {
    this.loginService.clearAuthorId();
    this.snackBarService.openSnackbar('Du wurdest ausgeloggt', 'Schliessen', this.DURATION_MS);
  }

  togglePasswordVisibility(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event): void {
    this.logout();
  }

  @HostListener('window:mousemove') onMouseMove() {
    this.loginService.updateLastActivity();
  }

  checkInactivity() {
    if (this.loginService.isInactive()) {
      const targetRoute = '/login';
      this.router.navigate([targetRoute], { relativeTo: this.route }).then(() => {
        this.logout();
      })
    }
  }
}
