import { TestBed } from '@angular/core/testing';

import { NgTimeoutService } from './ng-timeout.service';

describe('NgTimeoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTimeoutService = TestBed.get(NgTimeoutService);
    expect(service).toBeTruthy();
  });
});
