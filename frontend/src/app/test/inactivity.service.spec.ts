import { TestBed } from '@angular/core/testing';

import { InactivityService } from '../Services/inactivity.service';

describe('InactivityService', () => {
  let service: InactivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactivityService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
