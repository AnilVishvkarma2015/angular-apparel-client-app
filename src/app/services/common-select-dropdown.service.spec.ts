import { TestBed, inject } from '@angular/core/testing';

import { CommonSelectDropdownService } from './common-select-dropdown.service';

describe('CommonSelectDropdownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonSelectDropdownService]
    });
  });

  it('should be created', inject([CommonSelectDropdownService], (service: CommonSelectDropdownService) => {
    expect(service).toBeTruthy();
  }));
});
