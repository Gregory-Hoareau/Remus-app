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
  private text = {name: '' };
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
 conns: any;
  constructor(private file: File, private formBuilder: FormBuilder, private modalController: ModalController,
              private navParams: NavParams, private camera: Camera) {
    this.conns = navParams.get('conns');
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
    await this.modalController.dismiss({filename: this.text.name, img: this.image});
    let size = this.image.length;
    let sum = 0;
    this.conns.forEach((conn) => {
        // @ts-ignore
        while (size !== 0) {
            if (size > 150000) {
                conn.send({
                    imgPart: this.image.slice(sum, sum + 149999)
                });
                sum = sum + 150000;
                size = size - 150000;
            } else {
                conn.send({
                    imgEnd: [this.text.name, this.image.slice(sum, sum + size)]
                });
                size = size - size;
            }
        }
    });
    this.savePicture();
  }


  private savePicture() {
    this.file.createFile(this.file.dataDirectory, this.text.name, true).then();
    this.file.writeExistingFile(this.file.dataDirectory, this.text.name, this.image).then();
  }
}
