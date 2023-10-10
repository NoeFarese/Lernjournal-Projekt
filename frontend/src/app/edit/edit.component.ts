import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import jsPDF from "jspdf";
import { ServiceEintrag } from "../Services/service.eintrag";
import { ActivatedRoute } from "@angular/router";
import { Eintrag } from "../Interfaces/Eintrag";
import { PdfExportService } from "../Services/pdf-export.service";
import { LoginService } from "../Services/login.service";
import { SnackbarService } from "../Services/snackbar.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  constructor(
      private http : HttpClient,
      private eintragService: ServiceEintrag,
      private route: ActivatedRoute,
      private pdfExportService: PdfExportService,
      private loginService: LoginService,
      private snackBarService: SnackbarService
  ) {}

 titel: string = "";
 text: string = "";
 eintrag: Eintrag | undefined;

 sanitizeInput(input: string): string {
     input = input.replace(/<(?!\/?(i|b|h1)>)[^>]*>/g, '');
     input = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
     return input;
 }

 submit(){
   this.titel = this.sanitizeInput(this.titel);
   this.text = this.sanitizeInput(this.text);

   if (this.isNotBlank(this.text, this.titel)) {
     if (this.eintrag) {
       this.updateEintrag();
     } else {
       this.insertEintrag();
     }
    } else {
      this.snackBarService.openSnackbar('Text oder/und Titel sollten nicht leer sein', 'Schliessen', 3000);
   }
 }

  private isNotBlank(text: string, titel: string) {
    return text.trim() !== "" && titel.trim() !== "";
  }

  private insertEintrag() {
    this.http.post('http://localhost:8080/eintrag', {
      titel: this.titel,
      text: this.text,
      author_id: this.loginService.getAuthorId()
    }).subscribe(() => {
      this.showEintragWurdeGespeichertSnackbar();
    });
  }

  private updateEintrag() {
    this.http.put('http://localhost:8080/eintrag', {
      titel: this.titel,
      text: this.text,
      id: this.eintrag?.id
    }).subscribe(() => {
      this.showEintragWurdeGespeichertSnackbar();
    });
  }

    exportPdf(): void {
        const doc = new jsPDF();
        const maxWidth = 190;
        const margin = 10;
        let yPosition = margin;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFont("Arial");
        doc.text(<string>this.titel, 10, yPosition);
        yPosition += 10;

        const textWithoutHtmlTags = this.text?.replace(/<[^>]*>/g, '');
        const lines = doc.splitTextToSize(<string>textWithoutHtmlTags, maxWidth);

        for (let i = 0; i < lines.length; i++) {
            if (yPosition + doc.getTextDimensions(lines[i]).h > pageHeight) {
                doc.addPage();
                yPosition = margin;
            }
            doc.text(lines[i], margin, yPosition);
            yPosition += doc.getTextDimensions(lines[i]).h + 2;
        }

        doc.save(this.titel + '.pdf');
    }


    ngOnInit(): void {
   this.getEintrag();

    this.pdfExportService.exportRequested$.subscribe(ids => {
      if (ids.includes(<number>this.eintrag?.id)) {
        this.exportPdf();
      }
    });
  }

  getEintrag():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eintragService.getEintrag(id).subscribe(eintrag => {
      this.text = eintrag?.text;
      this.titel = eintrag?.titel;
      this.eintrag = eintrag;
    });
  }

  showEintragWurdeGespeichertSnackbar(): void {
    this.snackBarService.openSnackbar('Der Eintrag wurde erflogreich gespeichert','Schliessen', 3000);
  }

    insertTextWithFormat(format: string) {
        const textarea = document.getElementById("text") as HTMLTextAreaElement;
        const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        if (selectedText) {
            const newText = `<${format}>${selectedText}</${format}>`;
            textarea.value = textarea.value.substring(0, textarea.selectionStart) + newText + textarea.value.substring(textarea.selectionEnd);
            this.text = textarea.value;
        }
    }
}