import {Component, Input} from '@angular/core';
import {Eintrag} from "../../types/eintrag";
import {EintragService} from "../../core/eintrag.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-eintrag',
  templateUrl: './eintrag.component.html',
  styleUrls: ['./eintrag.component.css']
})

export class EintragComponent {
  constructor(private eintragService: EintragService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.getEintrag();
  }

  @Input() eintragArray?: Eintrag;

  getEintrag():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eintragService.getEintrag(id).subscribe((eintragArray: any) => this.eintragArray = eintragArray);
  }

  convertNewlines(text: string | undefined): string | undefined {
    if (text) {
      return text.replace(/\n/g, '<br>');
    }
    return text;
  }
}
