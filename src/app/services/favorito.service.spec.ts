import { TestBed, inject } from '@angular/core/testing';

import { FavoritoService } from './favorito.service';

describe('FavoritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritoService]
    });
  });

  it('should be created', inject([FavoritoService], (service: FavoritoService) => {
    expect(service).toBeTruthy();
  }));
});
