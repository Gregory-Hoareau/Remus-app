import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { IonicStorageModule } from '@ionic/storage';

describe('NotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicStorageModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: NotesService = TestBed.get(NotesService);
    expect(service).toBeTruthy();
  });
});
