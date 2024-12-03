import { TestBed } from '@angular/core/testing';

import { JobnotificationService } from './jobnotification.service';

describe('JobnotificationService', () => {
  let service: JobnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
