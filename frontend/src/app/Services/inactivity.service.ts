import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  constructor(private idle: Idle, private loginService: LoginService) {
    this.idle.setIdle(900);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      this.loginService.logout();
    });
  }
  startWatching() {
    this.idle.watch();
  }
}
