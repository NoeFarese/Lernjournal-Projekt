import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import jsPDF from "jspdf";
import { ServiceEintrag } from "../Services/service.eintrag";
import { ActivatedRoute } from "@angular/router";
import { Eintrag } from "../Interfaces/Eintrag";
import { PdfExportService } from "../Services/pdf-export.service";
import { LoginService } from "../Services/login.service";
import { SnackbarService } from "../Services/snackbar.service";
// import { Editor } from "ngx-editor";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(
      private http : HttpClient,
      private eintragService: ServiceEintrag,
      private route: ActivatedRoute,
      private pdfExportService: PdfExportService,
      private loginService: LoginService,
      private snackBarService: SnackbarService
  ) {}

 titel: string | undefined = "";
 text: string | undefined = "";
 eintrag: Eintrag | undefined;
 // editor: Editor = new Editor();

 submit(){
   // @ts-ignore
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
      //@ts-ignore
      id: this.eintrag.id
    }).subscribe(() => {
      this.showEintragWurdeGespeichertSnackbar();
    });
  }

  exportPdf(){
    const doc = new jsPDF;
    const maxWidth = 190;
    doc.text(<string>this.titel, 10, 10);
    const lines = doc.splitTextToSize(<string>this.text, maxWidth);
    doc.text(lines, 10, 20);
    doc.save(this.titel)
  }

  ngOnInit(): void {
   this.getEintrag();

    this.pdfExportService.exportRequested$.subscribe(ids => {
      if (ids.includes(<number>this.eintrag?.id)) {
        this.exportPdf();
      }
    });
  //  this.editor = new Editor();
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
}
