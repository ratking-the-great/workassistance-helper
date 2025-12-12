import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ToleranceRow {
  type: string;
  material: string;
  medium: string;
  dimension_mm: number;
  expected_value: number;
  tol_min: number;
  tol_max: number;
}

@Injectable({ providedIn: 'root' })
export class ToleranceService {
  private _rows: ToleranceRow[] | null = null;

  constructor(private http: HttpClient) {}

  async ensureLoaded(): Promise<void> {
    if (this._rows) return;

    const response = await this.http.get('/assets/stahlrohr_tolerances.csv', { responseType: 'text' }).toPromise();
    const txt = (response as string) || '';
    this._rows = this.parseCsv(txt);
  }

  private parseCsv(text: string): ToleranceRow[] {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (!lines.length) return [];
    const headers = lines[0].split(',').map(h => h.trim());

    const rows: ToleranceRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      const row: any = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = parts[j];
      }
      rows.push({
        type: row['type'],
        material: row['material'],
        medium: row['medium'],
        dimension_mm: Number(row['dimension_mm']),
        expected_value: Number(row['expected_value']),
        tol_min: Number(row['tol_min']),
        tol_max: Number(row['tol_max']),
      });
    }
    return rows;
  }

  async findDimensionForMeasuredValue(type: string, medium: string, measured: number): Promise<ToleranceRow | null> {
    await this.ensureLoaded();
    if (!this._rows) return null;
    // Filter rows for type & medium
    const rows = this._rows.filter(r => r.type.toLowerCase() === type.toLowerCase() && r.medium === medium);

    // Find a row where measured is within tolerance
    const found = rows.find(r => measured >= r.tol_min && measured <= r.tol_max);
    return found || null;
  }
}
