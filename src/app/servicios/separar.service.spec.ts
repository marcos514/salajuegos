import { TestBed } from '@angular/core/testing';

import { SepararService } from './separar.service';

describe('SepararService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SepararService = TestBed.get(SepararService);
    expect(service).toBeTruthy();
  });
});
