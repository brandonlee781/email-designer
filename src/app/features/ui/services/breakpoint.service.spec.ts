import { TestBed } from '@angular/core/testing';

import { BreakpointService } from './breakpoint.service';

describe('BreakpointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreakpointService = TestBed.get(BreakpointService);
    expect(service).toBeTruthy();
  });
});
