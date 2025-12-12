import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PipeTableService, Medium } from '../../services/pipe-table.service';

@Component({
  selector: 'app-stahlrohr',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="page">
    <a routerLink="/" class="back">← Zurück</a>
    <h2>Stahlrohr</h2>

    <div class="section">
      <label>Welches Medium?</label>
      <div class="options">
        <label *ngFor="let m of mediums">
          <input type="radio" name="medium" [value]="m" [(ngModel)]="selectedMedium">
          {{m}}
        </label>
      </div>
    </div>

    <div class="section">
      <label>Rohrdimension (mm): {{dimension}}</label>
      <input type="range" min="10" max="150" step="1" [(ngModel)]="dimension" />
      <div class="dimension-value">{{dimension}} mm</div>
    </div>

    <div class="section result">
      <label>Ergebnis</label>
      <div *ngIf="selectedMedium; else noMedium">
        <div>Wert: <strong>{{value}}</strong></div>
        <div class="note">(aus Tabelle interpoliert)</div>
      </div>
      <ng-template #noMedium>
        <div>Bitte wählen Sie ein Medium.</div>
      </ng-template>
    </div>
  </div>
  `,
  styles: [
    `
    .page { max-width:720px; margin:2rem auto; padding:1rem; }
    .back { display:inline-block; margin-bottom:1rem; text-decoration:none; color:#374151; }
    .options { display:flex; gap:1rem; margin-top:0.5rem; flex-wrap:wrap; }
    .section { margin-top:1rem; }
    input[type=range] { width:100%; }
    .result { margin-top:1.5rem; padding:1rem; background:#f8fafc; border-radius:6px; }
    .note { color:#6b7280; margin-top:0.5rem; font-size:0.9rem; }
    `,
  ],
})
export class StahlrohrComponent {
  mediums: Medium[] = ['Trinkwasser','Gas','Druckluft','Siederohr','Heizungswasser'];
  private _selectedMedium = signal<Medium | null>(null);
  private _dimension = signal<number>(50);

  constructor(private table: PipeTableService) {}

  get selectedMedium(): Medium | null {
    return this._selectedMedium();
  }
  set selectedMedium(v: Medium | null) {
    this._selectedMedium.set(v);
  }

  get dimension(): number {
    return this._dimension();
  }
  set dimension(v: number) {
    this._dimension.set(Number(v));
  }

  get value(): number | null {
    if (!this._selectedMedium()) return null;
    return this.table.getValue(this._selectedMedium()!, this._dimension());
  }
}
