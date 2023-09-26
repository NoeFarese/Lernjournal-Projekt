import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  private _exportRequested = new BehaviorSubject<number[]>([]);

  exportRequested$ = this._exportRequested.asObservable();

  requestExport(ids: number[]): void {
    this._exportRequested.next(ids);
  }
}
