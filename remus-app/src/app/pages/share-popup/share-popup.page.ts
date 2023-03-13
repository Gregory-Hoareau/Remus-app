import { Component, OnInit, Input } from "@angular/core";
import { UntypedFormBuilder } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ModalController, NavParams, AlertController } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import Peer, { DataConnection } from "peerjs";
import { PlayersService } from "src/app/providers/players/players.service";

@Component({
  selector: "app-share-popup",
  templateUrl: "./share-popup.page.html",
  styleUrls: ["./share-popup.page.scss"],
})
export class SharePopupPage implements OnInit {
  public text = { name: "" };
  image = "https://www.kasterencultuur.nl/editor/placeholder.jpg";
  connectedPlayers: any[];
  isIndeterminate: boolean;
  masterCheck: boolean;
  @Input() conns: DataConnection[];
  libraryImage;
  constructor(
    private file: File,
    private formBuilder: UntypedFormBuilder,
    private modalController: ModalController,
    private navParams: NavParams,
    private camera: Camera,
    public playersServ: PlayersService,
    private alertController: AlertController
  ) {
    this.conns = [];
    this.connectedPlayers = [];
    this.isIndeterminate = false;
    this.masterCheck = false;
  }

  ngOnInit() {
    this.playersServ.playersList.forEach((player) => {
      this.connectedPlayers.push({ val: player, isChecked: false });
    });
  }

  checkMaster() {
    setTimeout(() => {
      this.connectedPlayers.forEach((obj) => {
        obj.isChecked = this.masterCheck;
      });
    });
  }
  checkEvent() {
    const totalItems = this.connectedPlayers.length;
    let checked = 0;
    this.connectedPlayers.map((obj) => {
      if (obj.isChecked) {
        checked++;
      }
    });
    if (checked > 0 && checked < totalItems) {
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked === totalItems) {
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }
  async searchPhoto() {
    this.libraryImage = await this.openLibrary();
    this.image = "data:image/jpg;base64," + this.libraryImage;
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    return await this.camera.getPicture(options);
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
  async validModal() {
    this.connectedPlayers.forEach((player) => {
      if (player.isChecked) {
        this.conns.push(player.val.conn);
      }
    });
    this.savePicture();
    this.conns.forEach((conn) => {
      let size = this.image.length;
      console.log(size);
      let sum = 0;
      // @ts-ignore
      while (size !== 0) {
        if (size > 150000) {
          conn.send({
            imgPart: this.image.substring(sum, sum + 150000),
          });
          sum = sum + 150000;
          size = size - 150000;
        } else {
          conn.send({
            imgEnd: [this.text.name, this.image.substring(sum, sum + size)],
          });
          sum = sum + size;
          size = size - size;
          console.log(sum);
        }
      }
    });
    await this.modalController.dismiss({
      filename: this.text.name,
      img: this.image,
    });
  }

  private savePicture() {
    this.file.createFile(this.file.dataDirectory, this.text.name, true).then();
    this.file
      .writeExistingFile(this.file.dataDirectory, this.text.name, this.image)
      .then();
  }
}
