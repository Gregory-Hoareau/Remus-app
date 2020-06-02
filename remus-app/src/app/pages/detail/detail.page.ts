import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../providers/notes/notes.service';
import { Note } from '../../models/note';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  @Input()
  public note: Note;

  constructor(private route: ActivatedRoute, private notesService: NotesService, private navCtrl: NavController, private modalCtrl: ModalController) {
  }

  ngOnInit() {}

  noteChanged() {
    this.notesService.save();
  }

  deleteNote() {
    this.notesService.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }
}
