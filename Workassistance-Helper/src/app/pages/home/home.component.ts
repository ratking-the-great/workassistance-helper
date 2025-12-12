import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="home">
    <h1>Workassistance Helper</h1>
    <p>Wählen Sie einen Rohrtyp:</p>

    <div class="grid">
      <a routerLink="/pipe/stahlrohr" class="card">
        <div class="icon">🔩</div>
        <div class="label">Stahlrohr</div>
      </a>
      <a routerLink="/pipe/bleirohr" class="card">
        <div class="icon">⚫</div>
        <div class="label">Bleirohr</div>
      </a>
      <a routerLink="/pipe/pe" class="card">
        <div class="icon">🟦</div>
        <div class="label">PE / PE-X</div>
      </a>
      <a routerLink="/reparatursysteme" class="card">
        <div class="icon">🛠️</div>
        <div class="label">Reparatursysteme</div>
      </a>
    </div>
  </div>
  `,
  styles: [
    `
    .home { display:flex; flex-direction:column; align-items:center; padding:1rem; min-height:calc(100vh - 72px); gap:1rem; }
    .grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.75rem; width:100%; max-width:720px; }
    .card { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.25rem; border-radius:12px; background:#f8fafc; text-decoration:none; color:inherit; box-shadow:0 6px 16px rgba(0,0,0,0.08); min-height:120px; }
    .icon { font-size:44px; }
    .label { margin-top:0.5rem; font-weight:700; font-size:1.05rem; }
    a.card:hover { transform:translateY(-6px); box-shadow:0 12px 28px rgba(0,0,0,0.12); }

    @media (max-width:600px) {
      .grid { grid-template-columns:1fr; }
      .card { min-height:100px; padding:1rem; }
      .icon { font-size:40px; }
    }
    `,
  ],
})
export class HomeComponent {}
