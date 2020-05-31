import {Component, OnInit, Input} from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams, AlertController} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import Peer, { DataConnection } from 'peerjs';
import { PlayersService } from 'src/app/providers/players/players.service';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.page.html',
  styleUrls: ['./share-popup.page.scss'],
})
export class SharePopupPage implements OnInit {
  private text = {name: '' };
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
 @Input() conns: DataConnection[];
 libraryImage;
  constructor(private file: File, private formBuilder: FormBuilder, private modalController: ModalController,
              private navParams: NavParams, private camera: Camera, private playersServ: PlayersService, private alertController: AlertController) {
    this.conns = []
  }

  ngOnInit() {
  }

  async searchPhoto() {
    this.libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + this.libraryImage;
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
      this.savePicture();
      this.conns.forEach((conn) => {
          let size = this.image.length;
          console.log(size);
          let sum = 0;
          // @ts-ignore
          while (size !== 0) {
              if (size > 150000) {
                  conn.send({
                      imgPart: this.image.substring(sum, sum + 150000)
                  });
                  sum = sum + 150000;
                  size = size - 150000;
              } else {
                  conn.send({
                      imgEnd: [this.text.name, this.image.substring(sum, sum + size)]
                  });
                  sum = sum + size;
                  size = size - size;
                  console.log(sum);
              }
          }
      });
      await this.modalController.dismiss({filename: this.text.name, img: this.image});
  }


  async selectPlayers() {
      const inputs = [];
      this.playersServ.playersList.forEach(player => {
        inputs.push({
          name: player.name,
          type: 'checkbox',
          label: player.name,
          checked: false,
          value: player.conn
        });
      });

      if(inputs.length!==0)
        this.alertController.create({
          header:'Selectionnez les joueurs avec qui partager',
          inputs:inputs,
          buttons:[{
            text:'Partager',
            role:'partager',
            handler: data => {
              data.forEach(conn => {
                this.conns.push(conn);
              });
              this.validModal()
            }
          },{
            text:'à tous',
            role:'shareall',
            handler: () =>{
              this.conns = this.playersServ.getConns();
              this.validModal()
            }
          }]
        }).then(alert => {
          alert.present();
        });
  }

  private savePicture() {
    this.file.createFile(this.file.dataDirectory, this.text.name, true).then();
    this.file.writeExistingFile(this.file.dataDirectory, this.text.name, this.image).then();
  }
}
