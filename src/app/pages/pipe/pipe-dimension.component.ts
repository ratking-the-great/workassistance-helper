import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DimensionTableService } from '../../services/dimension-table.service';

@Component({
  selector: 'app-pipe-dimension',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="page">
    <a class="back" [routerLink]="['/pipe', type]">← Zurück</a>
    <h2>{{title}} — {{medium}}</h2>

    <div class="section">
      <label>Messwert (mm): {{measuredNum}} mm</label>
      <div style="font-size:0.9rem;color:#666;margin-top:0.25rem;">Tipp: Dezimalzeichen kann "," oder "." sein (33,5 = 33.5)</div>
      <input type="range" min="0" max="200" step="0.1" [(ngModel)]="measuredNum" (ngModelChange)="onSliderChange($event)" />
      <div style="margin-top:0.5rem;">
        <label>Oder als Zahl (mm)</label>
        <input type="text" [(ngModel)]="measuredStr" (ngModelChange)="onInputChange($event)" placeholder="z.B. 33,5" />
      </div>
    </div>

    <div class="section">
      <!-- button removed; check runs automatically on changes -->

      <div *ngIf="checkResult as r" style="margin-top:1rem;">
        <div *ngIf="r.found; else notFound">
          <div style="background:#ecfdf5;border:1px solid #bbf7d0;padding:1rem;border-radius:8px;font-weight:700;display:flex;align-items:center;gap:1rem;">
            <div style="font-size:2rem;line-height:1;">{{r.row?.dimension}}</div>
            <div style="font-size:1rem;color:#374151;">{{r.row?.zoll_d_mm}} mm</div>
          </div>
          <div style="margin-top:0.25rem;color:#6b7280;font-size:0.9rem;">Eingegebener Messwert (geparst): {{r.parsed}} mm</div>
        </div>
        <ng-template #notFound>
          <div *ngIf="r.invalid; else notFoundMsg">Ungültiger Messwert — bitte Dezimaltrennzeichen "," oder "." verwenden.</div>
          <ng-template #notFoundMsg>Kein passender Eintrag in der Toleranz-Tabelle gefunden.</ng-template>
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
  // dimension not used; measurements are taken from `measured` slider
  measuredNum: number | null = 50;
  measuredStr: string = '50';
  checkResult: { found: boolean; invalid?: boolean; unsupported?: boolean; parsed?: number; row?: any } | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private dimTable: DimensionTableService) {}

  ngOnInit(): void {
    this.type = (this.route.snapshot.paramMap.get('type') || '').toLowerCase();
    this.medium = (this.route.snapshot.paramMap.get('medium') || 'Trinkwasser');
    this.title = this.titleFromType(this.type);
    // run an initial check on load with default values
    this.checkTolerance().catch(() => {});
  }

  titleFromType(type: string) {
    switch(type) {
      case 'stahlrohr': return 'Stahlrohr';
      case 'bleirohr': return 'Bleirohr';
      case 'pe': return 'PE / PE-X';
      default: return 'Rohrtyp';
    }
  }

  onSliderChange(val: any) {
    const n = Number(val);
    this.measuredNum = isNaN(n) ? null : n;
    this.measuredStr = this.measuredNum !== null ? String(this.measuredNum) : '';
    // perform immediate check
    this.checkTolerance().catch(() => {});
  }

  onInputChange(val: any) {
    this.measuredStr = (val || '').toString();
    // also keep slider in sync if possible
    const parsed = parseFloat(this.measuredStr.replace(',', '.'));
    this.measuredNum = !isNaN(parsed) ? parsed : this.measuredNum;
    this.checkTolerance().catch(() => {});
  }

  // interpolation value removed; we now use measured value to find matching Dimension via CSV

  async checkTolerance() {
    // choose text input if present, otherwise use slider number
    const input = (this.measuredStr || '').trim();
    let measuredNum: number | null = null;
    if (input.length > 0) {
      measuredNum = parseFloat(input.replace(',', '.'));
    } else if (this.measuredNum !== null) {
      measuredNum = Number(this.measuredNum);
    }
    if (measuredNum === null || isNaN(measuredNum)) {
      this.checkResult = { found: false, invalid: true };
      return;
    }
    console.log('checkTolerance:', { type: this.type, medium: this.medium, measuredNum });
    // perform lookup for any type/medium using the generic CSV
    const row = await this.dimTable.findDimensionByMeasuredValue(measuredNum);
    if (!this.dimTable.isLoaded()) {
      this.checkResult = { found: false, invalid: false };
      console.error('DimensionTableService: CSV not loaded or empty — check server assets (angular.json) and restart dev server');
      return;
    }
    // include parsed value for easier debugging feedback
    if (row) {
      this.checkResult = { found: true, row, parsed: measuredNum };
    } else {
      this.checkResult = { found: false, parsed: measuredNum };
    }
  }
}
