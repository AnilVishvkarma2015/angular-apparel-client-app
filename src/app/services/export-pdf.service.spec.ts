import { TestBed, inject } from '@angular/core/testing';

import { ExportPdfService } from './export-pdf.service';

describe('ExportPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportPdfService]
    });
  });

  it('should be created', inject([ExportPdfService], (service: ExportPdfService) => {
    expect(service).toBeTruthy();
  }));
});
