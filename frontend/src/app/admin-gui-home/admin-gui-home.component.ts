import { Component, OnInit } from '@angular/core';
import { Person } from "../Interfaces/Person";
import { AdminService } from "../Services/admin.service";
import { LoginService } from "../Services/login.service";
import { PersonService } from "../Services/person.service";

@Component({
  selector: 'app-admin-gui-home',
  templateUrl: './admin-gui-home.component.html',
  styleUrls: ['./admin-gui-home.component.css']
})
export class AdminGuiHomeComponent implements OnInit{
  searchTerm: string = '';
  personen: Person[] = [];
  isAdmin: boolean | undefined;

  constructor(private adminService: AdminService, private loginService: LoginService, private personService: PersonService) {}

 ngOnInit(): void {
    this.getPersonenList();
   console.log(this.personen);
 }

getPersonenList(): void {
  this.isUserAdmin();
  const email = this.loginService.getUserEmail();

  if(this.isAdmin) {
    this.personService.getPersonenListeForAdmin(email).subscribe(personenArr => {
      this.personen = personenArr;
    });
  }
}

  isUserAdmin() {
    const email =  this.loginService.getUserEmail();

    this.adminService.isUserAdmin(email).subscribe((isUserAdmin) => {
      if (isUserAdmin) {
        this.isAdmin = isUserAdmin;
      }
    });
  }
  filterPersonen(): Person[] {
    return this.personen.filter(person =>
    person.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
