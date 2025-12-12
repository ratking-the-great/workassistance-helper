import { Injectable } from '@angular/core';

export type Medium = 'Trinkwasser' | 'Gas' | 'Druckluft' | 'Siederohr' | 'Heizungswasser';

@Injectable({ providedIn: 'root' })
export class PipeTableService {
  private readonly table: Record<Medium, Record<number, number>> = {
    Trinkwasser: { 10: 1.2, 15: 1.6, 20: 2.1, 25: 2.8, 32: 3.5, 40: 4.3, 50: 6.0, 65: 9.0, 80: 13.0, 100: 18.0 },
    Gas: { 10: 5.0, 15: 6.5, 20: 7.9, 25: 9.8, 32: 12.3, 40: 15.4, 50: 19.0, 65: 24.6, 80: 30.5, 100: 40.0 },
    Druckluft: { 10: 0.8, 15: 1.0, 20: 1.3, 25: 1.7, 32: 2.1, 40: 2.7, 50: 3.5, 65: 4.8, 80: 6.5, 100: 9.0 },
    Siederohr: { 10: 2.5, 15: 3.3, 20: 4.2, 25: 5.3, 32: 6.7, 40: 8.2, 50: 10.6, 65: 14.8, 80: 19.5, 100: 25.6 },
    Heizungswasser: { 10: 1.6, 15: 2.1, 20: 2.7, 25: 3.4, 32: 4.3, 40: 5.4, 50: 7.0, 65: 9.8, 80: 13.0, 100: 17.6 },
  };

  getValue(medium: Medium, diameter: number): number | null {
    const map = this.table[medium];
    if (!map) return null;
    // find keys
    const keys = Object.keys(map).map(k => Number(k)).sort((a,b)=>a-b);
    if (diameter <= keys[0]) return map[keys[0]];
    if (diameter >= keys[keys.length -1]) return map[keys[keys.length -1]];

    // find bracket
    let low = keys[0];
    let high = keys[0];
    for (let i = 1; i < keys.length; i++) {
      if (diameter <= keys[i]) {
        low = keys[i - 1];
        high = keys[i];
        break;
      }
    }
    const vLow = map[low];
    const vHigh = map[high];
    const factor = (diameter - low) / (high - low);
    const interpolated = vLow + (vHigh - vLow) * factor;
    return Math.round(interpolated * 100) / 100;
  }
}
