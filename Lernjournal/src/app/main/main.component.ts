import {Component, OnInit} from '@angular/core';
import {Eintrag} from "../Interfaces/Eintrag";
import {ServiceEintrag} from "../Services/service.eintrag";
import jsPDF from "jspdf";
import {LoginService} from "../Services/login.service";
import {SnackbarService} from "../Services/snackbar.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isDownloading: boolean = false;
  constructor(private eintragService: ServiceEintrag, private loginService: LoginService, private snackBarService: SnackbarService) {}

  ngOnInit(): void {
    this.getEintragList();
  }

  eintragArr: Eintrag[] = [];

  getEintragList(): void {
    const authorId = this.loginService.getAuthorId();
    if (authorId !== null) {
      this.eintragService.getEintragListForUser(authorId).subscribe(eintragArr => {
        this.eintragArr = eintragArr});
    }
  }

  delete(eintrag: Eintrag): void {
    this.eintragArr = this.eintragArr.filter(h => h !== eintrag);
    this.eintragService.deleteEintrag(eintrag.id).subscribe();
  }

  exportAllChecked = false;
  checkboxStates: { [id: number]: boolean } = {};

  checkboxChanged(id: number): void {
    if (this.checkboxStates[id]) {
      this.showProgressBarAndSnackbarForDownload();
      this.exportPdfForId(id);

      setTimeout(() => {
        this.checkboxStates[id] = false
      }, 1000);
    }
  }

  updateCheckboxStates(allChecked: boolean): void {
    this.eintragArr.forEach(eintrag => {
      this.checkboxStates[eintrag.id] = allChecked;
      if (allChecked) {
        this.showProgressBarAndSnackbarForDownload();
        this.exportPdfForId(eintrag.id);

        setTimeout(() => {
          this.checkboxStates[eintrag.id] = false;
          allChecked = false;
        }, 1000);
      }
    });
  }


  showProgressBarAndSnackbarForDownload(){
    this.isDownloading = true;

    setTimeout(() => {
      this.isDownloading = false
    }, 1000);

    this.snackBarService.openSnackbar('wird heruntergeladen','Schliessen',1000);
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

  searchTerm: string = '';

  filterEintraege(): Eintrag[] {
    return this.eintragArr.filter(eintrag =>
      eintrag.titel.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
