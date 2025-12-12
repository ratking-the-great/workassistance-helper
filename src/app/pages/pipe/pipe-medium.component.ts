import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pipe-medium',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="page">
    <div class="top">
      <a routerLink="/" class="back">← Home</a>
      <h2>{{title}}</h2>
    </div>

    <div class="intro">Bitte wählen Sie das Medium</div>

    <div class="grid">
      <button class="card" *ngFor="let m of mediums" (click)="goToSize(m)">
        <div class="icon">{{icons[m]}}</div>
        <div class="label">{{m}}</div>
      </button>
    </div>
  </div>
  `,
  styles: [
    `
    .page { padding:1rem; max-width:720px; margin:0 auto; }
    .top { display:flex; align-items:center; gap:1rem; }
    .back { text-decoration:none; color:#374151; }
    .grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:0.75rem; margin-top:1rem; }
    .card { min-height:120px; border-radius:12px; border:1px solid #e5e7eb; background:white; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.5rem; font-weight:700; font-size:1rem; padding:1rem; }
    .card:active { transform:scale(.98); }
    .icon { font-size:44px; }
    .intro { color:#6b7280; margin-top:0.75rem; }

    @media (max-width:600px) {
      .grid { grid-template-columns:1fr; }
      .card { min-height:100px; font-size:1.05rem; }
      .icon { font-size:40px; }
    }
    `
  ]
})
export class PipeMediumComponent implements OnInit {
  type = '';
  title = '';

  mediums = ['Trinkwasser','Gas','Druckluft','Siederohr','Heizungswasser'];

  icons: Record<string,string> = {
    Trinkwasser: '🚰',
    Gas: '🔥',
    Druckluft: '🫧',
    Siederohr: '🛁',
    Heizungswasser: '♨️'
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.type = (this.route.snapshot.paramMap.get('type') || '').toLowerCase();
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

  goToSize(medium: string) {
    this.router.navigate([`/pipe/${this.type}/size/${encodeURIComponent(medium)}`]);
  }
}
