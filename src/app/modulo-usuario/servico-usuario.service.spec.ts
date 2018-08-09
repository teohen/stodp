import { TestBed, inject } from '@angular/core/testing';

import { ServicoUsuarioService } from './servico-usuario.service';

describe('ServicoUsuarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoUsuarioService]
    });
  });

  it('should be created', inject([ServicoUsuarioService], (service: ServicoUsuarioService) => {
    expect(service).toBeTruthy();
  }));
});
