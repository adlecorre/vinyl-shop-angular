import { TestBed } from '@angular/core/testing';

import { Vinyle } from './vinyle';

describe('Vinyle', () => {
  let service: Vinyle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vinyle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
