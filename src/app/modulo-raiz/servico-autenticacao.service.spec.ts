import { TestBed, inject } from '@angular/core/testing';

import { ServicoAutenticacaoService } from './servico-autenticacao.service';

describe('ServicoAutenticacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoAutenticacaoService]
    });
  });

  it('should be created', inject([ServicoAutenticacaoService], (service: ServicoAutenticacaoService) => {
    expect(service).toBeTruthy();
  }));
});
