import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface DimensionRow {
  dimension: string;
  zoll_d_mm: number;
  tol_min_mm: number;
  tol_max_mm: number;
}

@Injectable({ providedIn: 'root' })
export class DimensionTableService {
  private rows: DimensionRow[] | null = null;

  constructor(private http: HttpClient) {}

  private parseCsv(text: string): DimensionRow[] {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return [];
    // header line
    const headers = lines[0].split(',').map(h => h.trim());
    const rows: DimensionRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      if (parts.length < 4) continue;
      rows.push({
        dimension: parts[0],
        zoll_d_mm: Number(parts[1]),
        tol_min_mm: Number(parts[2]),
        tol_max_mm: Number(parts[3]),
      });
    }
    return rows;
  }

  async ensureLoaded() {
    if (this.rows) return;
    try {
      const assetPath = 'assets/dimension_tolerances.csv';
      console.log('DimensionTableService: requesting', assetPath);
      const resp = await firstValueFrom(this.http.get(assetPath, { responseType: 'text' }));
      const txt = (resp as string) || '';
      this.rows = this.parseCsv(txt);
      console.log('DimensionTableService: loaded rows', this.rows?.length || 0);
    } catch (err) {
      console.error('DimensionTableService: failed to load assets/dimension_tolerances.csv', err);
      this.rows = [];
    }
  }

  isLoaded(): boolean {
    return !!(this.rows && this.rows.length);
  }

  async findDimensionByMeasuredValue(mm: number): Promise<DimensionRow | null> {
    await this.ensureLoaded();
    if (!this.rows) return null;
    const match = this.rows.find(r => mm >= r.tol_min_mm && mm <= r.tol_max_mm);
    return match || null;
  }
}
