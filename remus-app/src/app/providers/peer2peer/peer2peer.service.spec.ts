import { TestBed } from '@angular/core/testing';

import { Peer2peerService } from './peer2peer.service';

describe('Peer2peerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Peer2peerService = TestBed.get(Peer2peerService);
    expect(service).toBeTruthy();
  });
});
