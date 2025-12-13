import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="home">
    <div class="hero">
      <h1 class="hero-title">Willkommen</h1>
      <p class="hero-subtitle">Wählen Sie einen Rohrtyp für die Berechnung</p>
    </div>

    <div class="grid">
      <a routerLink="/pipe/stahlrohr" class="pipe-card">
        <div class="card-icon stahlrohr">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="8" width="18" height="8" rx="2"/>
            <path d="M3 12h18"/>
          </svg>
        </div>
        <div class="card-content">
          <h3>Stahlrohr</h3>
          <p>Berechnung für Stahlrohre</p>
        </div>
        <div class="card-arrow">→</div>
      </a>

      <a routerLink="/pipe/bleirohr" class="pipe-card">
        <div class="card-icon bleirohr">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 3v18"/>
          </svg>
        </div>
        <div class="card-content">
          <h3>Bleirohr</h3>
          <p>Berechnung für Bleirohre</p>
        </div>
        <div class="card-arrow">→</div>
      </a>

      <a routerLink="/pipe/pe" class="pipe-card">
        <div class="card-icon pe">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="6" width="20" height="12" rx="3"/>
            <path d="M6 12h12"/>
          </svg>
        </div>
        <div class="card-content">
          <h3>PE / PE-X</h3>
          <p>Berechnung für PE-Rohre</p>
        </div>
        <div class="card-arrow">→</div>
      </a>

      <a routerLink="/reparatursysteme" class="pipe-card">
        <div class="card-icon repair">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        </div>
        <div class="card-content">
          <h3>Reparatursysteme</h3>
          <p>Reparaturlösungen</p>
        </div>
        <div class="card-arrow">→</div>
      </a>
    </div>
  </div>
  `,
  styles: [
    `
    .home {
      max-width: 800px;
      margin: 0 auto;
      animation: fadeIn 0.4s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hero {
      text-align: center;
      margin-bottom: 2rem;
    }

    .hero-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      color: var(--text-muted);
      font-size: 1.125rem;
    }

    .grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;
    }

    .pipe-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 1rem;
      text-decoration: none;
      color: var(--text);
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px var(--shadow);
    }

    .pipe-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px -5px var(--shadow);
      border-color: var(--primary);
    }

    .card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 0.75rem;
      flex-shrink: 0;
    }

    .card-icon.stahlrohr {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
    }

    .card-icon.bleirohr {
      background: linear-gradient(135deg, #64748b 0%, #334155 100%);
      color: white;
    }

    .card-icon.pe {
      background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
      color: white;
    }

    .card-icon.repair {
      background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
      color: white;
    }

    .card-content {
      flex: 1;
    }

    .card-content h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .card-content p {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0;
    }

    .card-arrow {
      font-size: 1.5rem;
      color: var(--primary);
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease;
    }

    .pipe-card:hover .card-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 640px) {
      .pipe-card {
        padding: 1.25rem;
      }
      
      .card-icon {
        width: 48px;
        height: 48px;
      }
      
      .card-icon svg {
        width: 24px;
        height: 24px;
      }
      
      .hero-title {
        font-size: 1.75rem;
      }
      
      .hero-subtitle {
        font-size: 1rem;
      }
    }
    `,
  ],
})
export class HomeComponent {}
