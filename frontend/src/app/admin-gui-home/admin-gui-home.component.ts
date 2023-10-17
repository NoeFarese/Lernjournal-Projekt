import { Component, OnInit } from '@angular/core';
import { Person } from "../Interfaces/Person";
import { PersonService } from "../Services/person.service";

@Component({
  selector: 'app-admin-gui-home',
  templateUrl: './admin-gui-home.component.html',
  styleUrls: ['./admin-gui-home.component.css']
})
export class AdminGuiHomeComponent implements OnInit{
  searchTerm: string = '';
  personen: Person[] = [];

  constructor(private personService: PersonService) {}

 ngOnInit(): void {
    this.getPersonenList();
 }

getPersonenList(): void {
    this.personService.getPersonenListeForAdmin().subscribe(personenArr => {
      this.personen = personenArr;
    });
}

  filterPersonen(): Person[] {
    return this.personen.filter(person =>
    person.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
