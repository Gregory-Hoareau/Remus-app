import {Component, ViewChild, AfterViewInit, Input} from '@angular/core';
import {ModalController, Platform, ToastController} from '@ionic/angular';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-canvas',
  templateUrl: 'canvas.page.html',
  styleUrls: ['canvas.page.scss']
})
export class CanvasPage implements AfterViewInit {
  @Input()
  public image: string;

  settings: boolean;
  portrait: boolean;
  permissions: boolean;
  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  saveX: number;
  saveY: number;

  selectedColor = '#9e2956';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];

  drawing = false;
  lineWidth = 5;

  constructor( private androidPermissions: AndroidPermissions, private screenOrientation: ScreenOrientation, private plt: Platform, private base64ToGallery: Base64ToGallery, private toastCtrl: ToastController, private modalCtrl: ModalController) {
    this.settings = true;
    this.portrait = true;
    this.permissions = false;
  }

  ionViewWillEnter() {
    this.checkPermissions();
  }

  ngAfterViewInit() {
    const img = this.loadImage(this.image);
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    const height = (this.plt.width() * img.height) / img.width
    this.canvasElement.height = height + '';
    this.setBackground(img);
  }

  checkPermissions() {
    this.androidPermissions
        .checkPermission(this.androidPermissions
            .PERMISSION.WRITE_EXTERNAL_STORAGE)
        .then((result) => {
          this.permissions = result.hasPermission;
        }, (err) => {
          this.androidPermissions
              .requestPermission(this.androidPermissions
                  .PERMISSION.WRITE_EXTERNAL_STORAGE);
        });
    if (!this.permissions) {
      this.androidPermissions
          .requestPermissions([this.androidPermissions
              .PERMISSION.WRITE_EXTERNAL_STORAGE]);
    }
  }

  displaySettings() {
    if (this.settings) {
      this.settings = false;
    } else if (!this.settings) {
      this.settings = true;
    }
  }

  loadImage(image) {
    const img = new Image();
    img.src = image;
    return img;
  }
  startDrawing(ev) {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  endDrawing() {
    this.drawing = false;
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  setBackground(img) {
    const ctx = this.canvasElement.getContext('2d');

    img.onload = () => {
      ctx.drawImage(img,0,0, this.canvasElement.width, this.canvasElement.height);
    };
  }
  moved(ev) {
    if (!this.drawing) { return; }

    const canvasPosition = this.canvasElement.getBoundingClientRect();
    const ctx = this.canvasElement.getContext('2d');

    const currentX = ev.touches[0].pageX - canvasPosition.x;
    const currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  exportEditedImage() {
    const dataUrl = this.canvasElement.toDataURL();
    const options: Base64ToGalleryOptions = { prefix: 'edited_', mediaScanner:  false };

    this.base64ToGallery.base64ToGallery(dataUrl, options).then(
          async res => {
            const toast = await this.toastCtrl.create({
              message: 'Modification sauvegardée',
              duration: 1000
            });
            toast.present();
          },
          err => console.log('Erreur ', err)
      );
    this.modalCtrl.dismiss(dataUrl, 'cancel');
  }

}
