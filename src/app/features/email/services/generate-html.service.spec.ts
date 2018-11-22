import { TestBed } from '@angular/core/testing';

import { GenerateHtmlService } from './generate-html.service';

describe('GenerateHtmlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateHtmlService = TestBed.get(GenerateHtmlService);
    expect(service).toBeTruthy();
  });
});
