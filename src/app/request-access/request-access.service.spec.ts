import { TestBed } from '@angular/core/testing';

import { RequestAccessService } from './request-access.service';

describe('RequestAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestAccessService = TestBed.get(RequestAccessService);
    expect(service).toBeTruthy();
  });
});
