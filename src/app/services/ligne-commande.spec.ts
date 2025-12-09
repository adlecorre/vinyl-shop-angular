import { TestBed } from '@angular/core/testing';

import { LigneCommande } from './ligne-commande';

describe('LigneCommande', () => {
  let service: LigneCommande;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneCommande);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
