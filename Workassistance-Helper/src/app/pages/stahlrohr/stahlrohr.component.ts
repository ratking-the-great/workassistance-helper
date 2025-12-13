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

    <div class="result-box" *ngIf="selectedMedium">
      <div class="result-success">
        <div class="result-icon">📊</div>
        <div class="result-content">
          <div class="result-label">Berechneter Wert</div>
          <div class="result-value">{{value}}</div>
          <div class="result-details">
            <span class="detail-item">📏 Dimension: {{dimension}} mm</span>
            <span class="detail-item">🔧 Medium: {{selectedMedium}}</span>
          </div>
          <div class="result-note">Wert aus Tabelle interpoliert</div>
        </div>
      </div>
    </div>
    <div class="result-box" *ngIf="!selectedMedium">
      <div class="result-info">
        <div class="result-icon">ℹ️</div>
        <div class="result-content">
          Bitte wählen Sie ein Medium aus.
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .page { max-width:720px; margin:2rem auto; padding:1rem; }
    .back { display:inline-block; margin-bottom:1rem; text-decoration:none; color:var(--primary); font-weight:600; }
    .back:hover { text-decoration:underline; }
    
    h2 {
      margin-bottom: 1.5rem;
      color: var(--text);
    }
    
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: var(--text);
    }
    
    .section { margin-top:2rem; }
    
    .options { 
      display:flex; 
      gap:0.75rem; 
      margin-top:0.75rem; 
      flex-wrap:wrap; 
    }
    
    .options label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: var(--bg-card);
      border: 2px solid var(--border);
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 600;
      margin-bottom: 0;
    }
    
    .options label:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
    }
    
    .options input[type=radio] {
      margin: 0;
    }
    
    .options input[type=radio]:checked + label,
    .options label:has(input[type=radio]:checked) {
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      border-color: var(--primary);
      color: white;
    }
    
    input[type=range] { 
      width:100%; 
      height: 32px;
      margin: 1rem 0;
    }
    
    .dimension-value {
      text-align: center;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary);
      padding: 0.5rem;
      background: var(--bg-card);
      border-radius: 0.5rem;
      border: 1px solid var(--border);
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
    
    .result-info {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%);
      border: 2px solid var(--primary);
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
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
    
    .result-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--success);
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }
    
    .result-details {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
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
    
    .result-note {
      margin-top: 0.75rem;
      font-size: 0.875rem;
      color: var(--text-muted);
      font-style: italic;
    }
    
    @media (max-width: 640px) {
      .page { margin: 1rem auto; }
      
      .result-value {
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
