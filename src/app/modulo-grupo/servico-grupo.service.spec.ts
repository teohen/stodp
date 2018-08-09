import { TestBed, inject } from '@angular/core/testing';

import { ServicoGrupoService } from './servico-grupo.service';

describe('ServicoGrupoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoGrupoService]
    });
  });

  it('should be created', inject([ServicoGrupoService], (service: ServicoGrupoService) => {
    expect(service).toBeTruthy();
  }));
});
