import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SnackbarService } from "../Services/snackbar.service";
import { LoginService } from "../Services/login.service";
import { PersonService } from "../Services/person.service";
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, private loginService: LoginService, private personService: PersonService, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userEmail = this.loginService.getUserEmail();
  }

  deleteAccount(): void {
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');

    if (this.form.invalid) {
      this.snackBarService.openSnackbar('Bitte füllen Sie alle Felder aus', 'Schließen', this.DURATION_MS);
    } else if (password?.value !== confirmPassword?.value) {
      this.snackBarService.openSnackbar('Passwörter stimmen nicht überein', 'Schließen', this.DURATION_MS);
    } else {
      this.snackBarService.openSnackbar('Ihr Account wird jetzt gelöscht', 'Schliessen', this.DURATION_MS);
      this.deleteAndLogoutUser();
    }
  }

  deleteAndLogoutUser(): void {
    setTimeout(() => {
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
