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
  eintragArr: Eintrag[] = [];
  exportAllChecked = false;
  checkboxStates: { [id: number]: boolean } = {};
  searchTerm: string = '';
  constructor(private eintragService: ServiceEintrag, private loginService: LoginService, private snackBarService: SnackbarService) {}

  ngOnInit(): void {
    this.getEintragList();
  }

  getEintragList(): void {
    const authorId = this.loginService.getAuthorId();
    if (authorId !== null) {
      this.eintragService.getEintragListForUser(authorId).subscribe(eintragArr => {
        this.eintragArr = eintragArr});
    }
  }

  delteEintrag(eintrag: Eintrag): void {
    this.eintragArr = this.eintragArr.filter(h => h !== eintrag);
    this.eintragService.deleteEintrag(eintrag.id).subscribe();
  }

  updateCheckboxStates(allChecked: boolean): void {
    this.eintragArr.forEach(eintrag => {
      this.checkboxStates[eintrag.id] = allChecked;
      if (allChecked) {
        this.downloadSelectedPDFs(eintrag.id);

        setTimeout(() => {
          this.checkboxStates[eintrag.id] = false;
          allChecked = false;
        }, 1000);
      }
    });
  }

  downloadSelectedPDFs(id: number): void {
      this.showProgressBarAndSnackbarForDownload();
      this.exportPdfForId(id);
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
      const maxWidth = 190;
      const margin = 10;
      let yPosition = margin;
      const pageHeight = doc.internal.pageSize.height;
      doc.setFont("Arial");

      const textWithoutHtmlTags = eintrag.text.replace(/<[^>]*>/g, '');
      const lines = doc.splitTextToSize(textWithoutHtmlTags, maxWidth);

      for (let i = 0; i < lines.length; i++) {
        if (yPosition + 10 + doc.getTextDimensions(lines[i]).h > pageHeight) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(lines[i], margin, yPosition);
        yPosition += doc.getTextDimensions(lines[i]).h + 2;
      }

      doc.save(eintrag.titel + '.pdf');
    }
  }


  filterEintraege(): Eintrag[] {
    return this.eintragArr.filter(eintrag =>
      eintrag.titel.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
