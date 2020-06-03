import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { IonicStorageModule } from '@ionic/storage';
import { defineInjectable } from '@angular/core';
import { Note } from 'src/app/models/note';

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

  describe('When the service is initialized', () => {
    
    it('should be empty', () => {
      const service: NotesService = TestBed.get(NotesService);
      expect(service.notes.length).toEqual(0, "but length is " + service.notes.length)
    })

    describe('When an note is created', () => {

      it('should be added to the list once', () => {
        const service: NotesService = TestBed.get(NotesService);
        const note: Note = service.createNote('test note');
        expect(service.notes.length).toEqual(1, 'but added ' + service.notes.length)
        expect(service.notes[0]).toEqual(note, 'but is wrong value')
      })
    })


  });


});
