import { TestBed, inject } from '@angular/core/testing';

import { ServicoSocketService } from './servico-socket.service';

describe('ServicoSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoSocketService]
    });
  });

  it('should be created', inject([ServicoSocketService], (service: ServicoSocketService) => {
    expect(service).toBeTruthy();
  }));
});
