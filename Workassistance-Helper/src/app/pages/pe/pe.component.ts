import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PipeTableService } from '../../services/pipe-table.service';

@Component({
  selector: 'app-pe',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
  <div class="page">
    <a routerLink="/" class="back">← Zurück</a>
    <h2>PE / PE-X</h2>
    <div class="section">
      <label>Welches Medium?</label>
      <div class="options">
        <label><input type="radio" name="medium" value="Trinkwasser" [(ngModel)]="selectedMedium"> Trinkwasser</label>
        <label><input type="radio" name="medium" value="Heizungswasser" [(ngModel)]="selectedMedium"> Heizungswasser</label>
      </div>
    </div>
    <div class="section">
      <label>Rohrdimension (mm): {{dimension}} mm</label>
      <input type="range" min="10" max="150" step="1" [(ngModel)]="dimension" />
    </div>
    <div class="section result">Wert: {{value}}</div>
  </div>
  `,
  styles: [
    `
    .page { max-width:720px; margin:2rem auto; padding:1rem; }
    .back { display:inline-block; margin-bottom:1rem; text-decoration:none; color:#374151; }
    .options { display:flex; gap:1rem; margin-top:0.5rem; }
    input[type=range] { width:100%; }
    .result { margin-top:1.5rem; padding:1rem; background:#f8fafc; border-radius:6px; }
    `,
  ],
})
export class PEComponent {
  selectedMedium = 'Trinkwasser';
  dimension = 50;

  constructor(private table: PipeTableService) {}

  get value() {
    return this.table.getValue(this.selectedMedium as any, this.dimension);
  }
}
