import { Component, Input, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Eintrag } from "../Interfaces/Eintrag";
import { ServiceEintrag } from "../Services/service.eintrag";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-eintrag',
  templateUrl: './eintrag.component.html',
  styleUrls: ['./eintrag.component.css']
})

export class EintragComponent implements OnInit{
  constructor(private eintragService: ServiceEintrag, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.getEintrag();
  }

  @Input() eintragArray?: Eintrag;

  getEintrag():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eintragService.getEintrag(id).subscribe(eintragArray => this.eintragArray = eintragArray);
  }

  convertNewlines(text: string | undefined): string | undefined {
    if (text) {
      return text.replace(/\n/g, '<br>');
    }
    return text;
  }

  goBack(): void {
    this.location.back();
  }
}
