import { Component, OnInit } from '@angular/core';
import { LoginService } from "../Services/login.service";
import { ServiceEintrag } from "../Services/service.eintrag";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  constructor(private loginService: LoginService, private eintragService: ServiceEintrag) {}

  userEmail: string | null = '';
  anzahlEintraege: number | null = null;

  ngOnInit(){
    this.userEmail = this.loginService.getUserEmail();
    this.getAnzahlEintraege();
  }

  getAnzahlEintraege() {
    const authorId = this.loginService.getAuthorId();
    if (authorId) {
      this.eintragService.getAnzahlEintraege(authorId).subscribe(count => {
        this.anzahlEintraege = count;
      });
    }
  }
}