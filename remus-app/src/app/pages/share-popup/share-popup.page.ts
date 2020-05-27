import {Component, OnInit} from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import Peer from 'peerjs';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.page.html',
  styleUrls: ['./share-popup.page.scss'],
})
export class SharePopupPage implements OnInit {
  conn;
  connList;
  private text = {name: '' };
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';

  constructor(private file: File, private formBuilder: FormBuilder, private modalController: ModalController,
              private navParams: NavParams, private camera: Camera) {
    this.connList = navParams.get('connList');
  }

  ngOnInit() {
  }

  async searchPhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
  async validModal() {
    await this.modalController.dismiss(this.text.name);
    this.savePicture();
    for (const conns of this.connList) {
      conns.send({
        fileName: this.text.name,
        img: this.image
      });
    }
  }


  private savePicture() {
    this.file.createFile(this.file.dataDirectory, this.text.name, true).then();
    this.file.writeExistingFile(this.file.dataDirectory, this.text.name, this.image).then();
  }
}
