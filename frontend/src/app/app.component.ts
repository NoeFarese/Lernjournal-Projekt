import {Component, OnInit} from '@angular/core';
import { LoginService } from "./Services/login.service";
import { InactivityService } from "./Services/inactivity.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userEmail: string | null = '';
  constructor(private loginService: LoginService, private inactivityService: InactivityService) {}

  title = 'Lernjournal';

  get isLoggedIn(): boolean {
    return this.loginService.getAuthorId() !== null;
  }

  ngOnInit() {
    this.userEmail = this.loginService.getUserEmail();
    this.inactivityService.startWatching();
  }
}
