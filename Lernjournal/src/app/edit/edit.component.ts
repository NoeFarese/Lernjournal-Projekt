import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import jsPDF from "jspdf";
import {ServiceEintrag} from "../Services/service.eintrag";
import {ActivatedRoute} from "@angular/router";
import {Eintrag} from "../Interfaces/Eintrag";
import {PdfExportService} from "../Services/pdf-export.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  constructor(private http : HttpClient, private eintragService: ServiceEintrag, private route: ActivatedRoute, private pdfExportService: PdfExportService ) {}

 titel: string | undefined = "";
 text: string | undefined = "";
 eintrag: Eintrag | undefined;
 isValidInput: boolean = true;
 isSaved: boolean = false;

 submit(){
   // @ts-ignore
   if (this.text.trim() !== "" && this.titel.trim() !== "") {
     if(this.eintrag){
       this.updateEintrag();
     } else{
       this.insertEintrag();
     }
    } else {
      this.isValidInput = false;
     setTimeout(() => {
       this.isValidInput = true;
     }, 3000);
    }
 }

  private insertEintrag() {
    this.http.post('http://localhost:8080/eintrag', {
      titel: this.titel,
      text: this.text
    }).subscribe(() => {
      this.isValidInput = true;
      this.isSaved = true;

      setTimeout(() => {
        this.isSaved = false;
      }, 3000);
    });
  }

  private updateEintrag() {
    this.http.put('http://localhost:8080/eintrag', {
      titel: this.titel,
      text: this.text,
      //@ts-ignore
      id: this.eintrag.id
    }).subscribe(() => {
      this.isValidInput = true;
      this.isSaved = true;

      setTimeout(() => {
        this.isSaved = false;
      }, 3000);
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
  }

  getEintrag():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eintragService.getEintrag(id).subscribe(eintrag => {
      this.text = eintrag?.text;
      this.titel = eintrag?.titel;
      this.eintrag = eintrag;
    });
  }
}
