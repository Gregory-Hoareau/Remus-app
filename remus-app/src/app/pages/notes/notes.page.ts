import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {NotesService} from '../../providers/notes/notes.service';
import {DetailPage} from "../detail/detail.page";
import {Note} from "../../models/note";


@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss'],
})
export class NotesPage implements OnInit {


  constructor(public noteService: NotesService, private alertCtrl: AlertController, private navCtrl: NavController, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.noteService.load();
  }

  addNote() {
    this.alertCtrl.create({
      header: 'Nouvelle Note',
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'titre de la note'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.noteService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  detailModal(note) {
    this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
         note: note,
      },
      swipeToClose: true,
    }).then(modal => {
      modal.present();
    });
  }
}
