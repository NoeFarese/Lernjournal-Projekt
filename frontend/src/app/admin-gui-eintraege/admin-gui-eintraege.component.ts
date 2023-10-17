import { Component, OnInit } from '@angular/core';
import { ServiceEintrag } from "../Services/service.eintrag";
import { SnackbarService } from "../Services/snackbar.service";
import { Eintrag } from "../Interfaces/Eintrag";
import jsPDF from "jspdf";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-gui-eintraege',
  templateUrl: './admin-gui-eintraege.component.html',
  styleUrls: ['./admin-gui-eintraege.component.css']
})
export class AdminGuiEintraegeComponent implements OnInit {

  userEmail: string | null = '';
  isDownloading: boolean = false;
  eintragArr: Eintrag[] = [];
  exportAllChecked = false;
  checkboxStates: { [id: number]: boolean } = {};
  searchTerm: string = '';

  constructor (private eintragService: ServiceEintrag, private snackBarService: SnackbarService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const selectedEmail = params['email'];
      this.userEmail = selectedEmail;
      this.getEintragList(selectedEmail);
    });
  }

  getEintragList(email: string): void {
    this.eintragService.getEintragListForAdmin(email).subscribe(eintragArr => {
      this.eintragArr = eintragArr;
    });
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
      let {doc, maxWidth, margin, yPosition, pageHeight} = this.setSizesAndFontsForPDF(eintrag);

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

  private setSizesAndFontsForPDF(eintrag: Eintrag) {
    const doc = new jsPDF();
    const maxWidth = 190;
    const margin = 10;
    let yPosition = margin;
    const pageHeight = doc.internal.pageSize.height;
    const titleFontSize = 16;
    const textFontSize = 12;

    doc.setFont("Arial");
    doc.setFontSize(titleFontSize);
    doc.text(eintrag.titel, 10, yPosition);
    yPosition += titleFontSize - 8;

    doc.setFontSize(textFontSize);
    return {doc, maxWidth, margin, yPosition, pageHeight};
  }

  filterEintraege(): Eintrag[] {
    return this.eintragArr.filter(eintrag =>
        eintrag.titel.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
