import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  showErrorMessage: boolean = false;
  isSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private registrationService: RegistrationService) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registrationForm.invalid) {
      this.showErrorMessage = true;

      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);

      return;
    } else {
      this.checkIfEmailIsAlreadyInUse();
    }
  }

  private checkIfEmailIsAlreadyInUse() {
    const email = this.registrationForm.value.email;
    this.registrationService.getHttpResponseEmail(email).subscribe((exists) => {
      if (!exists) {
        this.createRegistration();
      } else {
        this.registrationForm.controls['email'].setErrors({ emailUsed: true });
      }
    });
  }

  private createRegistration() {
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;

    this.http.post('http://localhost:8080/registration', {
        email: email,
        password: password,
      }).subscribe(() => {
        this.isSuccess = true;

        setTimeout(() => {
          this.isSuccess = false;
          this.registrationForm.reset();
        }, 3000);
      });
  }
}
