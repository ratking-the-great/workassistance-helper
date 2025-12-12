import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DimensionTableService } from './dimension-table.service';

describe('DimensionTableService', () => {
  let service: DimensionTableService;
  let httpMock: HttpTestingController;

  const csv = `Dimension,Zoll_D_mm,Toleranz_min_mm,Toleranz_max_mm
3/8,17.2,16.7,17.5
1/2,21.3,21.0,21.8
3/4,26.9,26.5,27.3
1,33.7,33.3,34.2
4,114.3,113.1,115.0
`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [DimensionTableService] });
    service = TestBed.inject(DimensionTableService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('findDimensionByMeasuredValue should match 33.5 to Dimension 1', async () => {
    const promise = service.findDimensionByMeasuredValue(33.5);
    const req = httpMock.expectOne('/assets/dimension_tolerances.csv');
    req.flush(csv);
    const row = await promise;
    expect(row).toBeTruthy();
    expect(row?.dimension).toBe('1');
  });
});
