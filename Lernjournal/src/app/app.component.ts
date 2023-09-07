import { Component, OnInit } from '@angular/core';
import { LoginService } from "./Services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userEmail: string | null = '';
  constructor(private loginService: LoginService) {}

  title = 'Lernjournal';

  get isLoggedIn(): boolean {
    return this.loginService.getAuthorId() !== null;
  }

  ngOnInit() {
    this.userEmail = this.loginService.getUserEmail();
  }
}
