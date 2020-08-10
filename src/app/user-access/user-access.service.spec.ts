import { TestBed } from '@angular/core/testing';

import { UserAccessService } from './user-access.service';

describe('UserAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAccessService = TestBed.get(UserAccessService);
    expect(service).toBeTruthy();
  });
});
