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

      <div *ngIf="checkResult as r" class="result-box">
        <div *ngIf="r.found; else notFound">
          <div class="result-success">
            <div class="result-icon">✓</div>
            <div class="result-content">
              <div class="result-label">Dimension gefunden:</div>
              <div class="result-dimension">{{r.row?.dimension}}</div>
              <div class="result-details">
                <span class="detail-item">📏 {{r.row?.zoll_d_mm}} mm</span>
                <span class="detail-item">📊 Messwert: {{r.parsed}} mm</span>
              </div>
            </div>
          </div>
        </div>
        <ng-template #notFound>
          <div class="result-error">
            <div class="result-icon">⚠️</div>
            <div class="result-content">
              <div *ngIf="r.invalid; else notFoundMsg">Ungültiger Messwert — bitte Dezimaltrennzeichen "," oder "." verwenden.</div>
              <ng-template #notFoundMsg>Kein passender Eintrag in der Toleranz-Tabelle gefunden.</ng-template>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .page { padding:1rem; max-width:720px; margin:0 auto; }
    .back { display:inline-block; text-decoration:none; color:var(--primary); font-weight:600; }
    .back:hover { text-decoration:underline; }
    .section { margin-top:1.5rem; }
    
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    
    input[type=range] { 
      width:100%; 
      height:32px;
      margin: 0.5rem 0;
    }
    
    input[type=text] {
      width: 100%;
      padding: 0.75rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      color: var(--text);
      font-size: 1rem;
    }
    
    input[type=text]:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
    
    .result-box {
      margin-top: 2rem;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .result-success {
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%);
      border: 2px solid #10b981;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .result-error {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
      border: 2px solid #ef4444;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .result-icon {
      font-size: 2rem;
      line-height: 1;
      flex-shrink: 0;
    }
    
    .result-content {
      flex: 1;
    }
    
    .result-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }
    
    .result-dimension {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--success);
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }
    
    .result-details {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 0.75rem;
    }
    
    .detail-item {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem 1rem;
      background: var(--bg-card);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text);
      border: 1px solid var(--border);
    }
    
    @media (max-width: 640px) {
      .result-dimension {
        font-size: 2rem;
      }
      
      .result-details {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .detail-item {
        width: 100%;
      }
    }
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
