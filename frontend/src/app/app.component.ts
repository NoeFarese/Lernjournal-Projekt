import {Component, OnInit} from '@angular/core';
import { LoginService } from "./Services/login.service";
import { InactivityService } from "./Services/inactivity.service";
import { AdminService } from "./Services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  userEmail: string | null = '';
  isAdmin: boolean | undefined;
  constructor(private loginService: LoginService, private inactivityService: InactivityService, private adminService: AdminService) {}

  title = 'Lernjournal';

  get isLoggedIn(): boolean {
    return this.loginService.getAuthorId() !== null;
  }

  ngOnInit() {
    this.userEmail = this.loginService.getUserEmail();
    this.inactivityService.startWatching();

    this.adminService.isUserAdmin(this.userEmail).subscribe((isUserAdmin) => {
      if (isUserAdmin) {
        this.isAdmin = isUserAdmin;
      }
    });
  }
}
