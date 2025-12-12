import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reparatursysteme',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="page">
    <a routerLink="/" class="back">← Zurück</a>
    <h2>Reparatursysteme</h2>
    <p>Hier können Sie mögliche Reparatursysteme auswähen (Platzhalter)</p>
  </div>
  `,
  styles: [
    `
    .page { max-width:720px; margin:2rem auto; padding:1rem; }
    .back { display:inline-block; margin-bottom:1rem; text-decoration:none; color:#374151; }
    `,
  ],
})
export class ReparatursystemeComponent {}
