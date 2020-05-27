import { Component, OnInit, Input } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {SharePopupPage} from '../share-popup/share-popup.page';
import { Router} from '@angular/router';
import {File} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-doc-popup',
  templateUrl: './doc-popup.page.html',
  styleUrls: ['./doc-popup.page.scss'],
})
export class DocPopupPage implements OnInit {
  connList;
  private items = [];
  private dataReturned: any;
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  constructor(private file: File, private formBuilder: FormBuilder, private modalController: ModalController, private modalCtr: ModalController,
              private navParams: NavParams) {
    this.connList = navParams.get('connList');
    this.file.listDir(this.file.dataDirectory , '').then((listing) => {
      for (const files of listing) {
        if (files.isFile === true) {
          this.items.push(files.name);
          console.log('This is a file');
          // Code if its a folder
        } else {
          console.log('This is a folder') ;
        }
      }
    });
   }
   ngOnInit(): void {
   }


  async closeModal() {
    await this.modalController.dismiss();
  }

async itemSelected(item) {
    this.file.readAsText(this.file.dataDirectory, item).then((value) => {
      this.image = value;
      this.modalController.dismiss(this.image);
    });
  }

  async shareDoc() {
    const modal = await this.modalCtr.create({
      component: SharePopupPage,
      cssClass: 'custom-modal-css',
      componentProps: {
        connList : this.connList
      },
      swipeToClose: true
    });

    modal.onWillDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== '') {
        this.dataReturned = dataReturned.data;
        this.items.push(this.dataReturned);
      }
    });

    return await modal.present();
  }


}
