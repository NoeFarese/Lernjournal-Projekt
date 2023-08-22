import {Component} from '@angular/core';
import {Eintrag} from "../Interfaces/Eintrag";
import {ServiceEintrag} from "../Services/service.eintrag";
import jsPDF from "jspdf";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private eintragService: ServiceEintrag) {
  }

  ngOnInit(): void {
    this.getEintragList();
  }

  eintragArr: Eintrag[] = [];

  getEintragList(): void {
    this.eintragService.getEintragList().subscribe(eintragArr => this.eintragArr = eintragArr);
  }

  delete(eintrag: Eintrag): void {
    this.eintragArr = this.eintragArr.filter(h => h !== eintrag);
    this.eintragService.deleteEintrag(eintrag.id).subscribe();
  }

  exportAllChecked = false;
  checkboxStates: { [id: number]: boolean } = {};

  checkboxChanged(id: number): void {
    if (this.checkboxStates[id]) {
      console.log('Checkbox wurde ausgewählt');
      this.exportPdfForId(id);
    } else {
      console.log('Checkbox wurde abgewählt');
    }
  }

  exportPdfForId(id: number): void {
    const eintrag = this.eintragArr.find(e => e.id === id);
    if (eintrag) {
      const doc = new jsPDF();
      doc.text(eintrag.titel, 10, 10);
      const maxWidth = 190;
      const lines = doc.splitTextToSize(eintrag.text, maxWidth);
      doc.text(lines, 10, 20);
      doc.save(eintrag.titel + '.pdf');
    }
  }

  updateCheckboxStates(allChecked: boolean): void {
    this.eintragArr.forEach(eintrag => {
      this.checkboxStates[eintrag.id] = allChecked;
      if (allChecked) {
        this.exportPdfForId(eintrag.id);
      }
    });
  }

  searchTerm: string = '';

  filterEintraege(): Eintrag[] {
    return this.eintragArr.filter(eintrag =>
      eintrag.titel.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
