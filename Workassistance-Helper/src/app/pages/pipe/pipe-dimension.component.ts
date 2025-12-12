import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PipeTableService } from '../../services/pipe-table.service';
import { ToleranceService } from '../../services/tolerance.service';

@Component({
  selector: 'app-pipe-dimension',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="page">
    <a class="back" [routerLink]="['/pipe', type]">← Zurück</a>
    <h2>{{title}} — {{medium}}</h2>

    <div class="section">
      <label>Rohrdimension (mm): {{dimension}} mm</label>
      <input type="range" min="10" max="100" step="1" [(ngModel)]="dimension" />
    </div>

    <div class="section result">
      <label>Ergebnis</label>
      <div>
        <div *ngIf="value !== null; else noValue">Wert: <strong>{{value}}</strong></div>
        <ng-template #noValue><div>Kein Wert verfügbar</div></ng-template>
      </div>
    </div>

    <div class="section">
      <label>Messwert (zu prüfen)</label>
      <input type="number" min="0" step="any" [(ngModel)]="measured" />
      <button (click)="checkTolerance()" style="margin-top:0.5rem;">Prüfen</button>

      <div *ngIf="checkResult as r" style="margin-top:1rem;">
        <div *ngIf="r.found; else notFound">
          Gefunden: Dimension: <strong>{{r.row?.dimension_mm}}</strong> mm — Erwartet: {{r.row?.expected_value}} — Toleranz [{{r.row?.tol_min}} — {{r.row?.tol_max}}]
        </div>
        <ng-template #notFound>
          Kein passender Eintrag in der Toleranz-Tabelle gefunden.
        </ng-template>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .page { padding:1rem; max-width:720px; margin:0 auto; }
    .back { display:inline-block; text-decoration:none; color:#374151; }
    .section { margin-top:1rem; }
    input[type=range] { width:100%; height:28px; }
    .result { margin-top:1rem; padding:1rem; background:#f8fafc; border-radius:8px; font-size:1.1rem; }
    `
  ]
})
export class PipeDimensionComponent implements OnInit {
  type = '';
  medium = '';
  title = '';
  dimension = 50;

  measured: number | null = null;
  checkResult: { found: boolean; row?: any } | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private table: PipeTableService, private tolerance: ToleranceService) {}

  ngOnInit(): void {
    this.type = (this.route.snapshot.paramMap.get('type') || '').toLowerCase();
    this.medium = (this.route.snapshot.paramMap.get('medium') || 'Trinkwasser');
    this.title = this.titleFromType(this.type);
  }

  titleFromType(type: string) {
    switch(type) {
      case 'stahlrohr': return 'Stahlrohr';
      case 'bleirohr': return 'Bleirohr';
      case 'pe': return 'PE / PE-X';
      default: return 'Rohrtyp';
    }
  }

  get value() {
    if (!this.medium) return null;
    return this.table.getValue(this.medium as any, this.dimension);
  }

  async checkTolerance() {
    if (this.measured === null) return;
    // Only support stahlrohr + Heizungswasser for now as requested
    if (this.type.toLowerCase() !== 'stahlrohr' || this.medium !== 'Heizungswasser') {
      this.checkResult = { found: false };
      return;
    }
    const row = await this.tolerance.findDimensionForMeasuredValue(this.type, this.medium, Number(this.measured));
    if (row) {
      this.checkResult = { found: true, row };
    } else {
      this.checkResult = { found: false };
    }
  }
}
