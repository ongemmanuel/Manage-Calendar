import { TestBed } from '@angular/core/testing';

import { AccessCalendarService } from './access-calendar.service';

describe('AccessCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessCalendarService = TestBed.get(AccessCalendarService);
    expect(service).toBeTruthy();
  });
});
