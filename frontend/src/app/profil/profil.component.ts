import { Component, OnInit } from '@angular/core';
import { LoginService } from "../Services/login.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  constructor(private loginService: LoginService) {}

  userEmail: string | null = '';

  ngOnInit(){
    this.userEmail = this.loginService.getUserEmail();
  }
}
