import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) {

  }

  load(): Promise<boolean> {

    return new Promise(resolve => {
      this.storage.get('notes').then((notes) => {

        if(notes != null)
          this.notes = notes;

        this.loaded = true;
        resolve(true);

      });
    });
  }

  save(): void {
    this.storage.set('notes', this.notes);
  }

  createNote(title): Note {
    const note = {
      title: title,
      content: ''
    } as Note

    this.notes.push(note);
    //this.save();

    return note
  }

  reset(): void {
    this.notes.forEach( note => {
      this.deleteNote(note);
    });
  }

  deleteNote(note): void {

    let index = this.notes.indexOf(note);

    if(index > -1){
      this.notes.splice(index, 1);
      this.save();
    }

  }

}
