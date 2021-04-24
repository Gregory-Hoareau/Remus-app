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

  testImage: string;
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

  // ask for permission when the modal is opened
  ionViewWillEnter() {
    this.checkPermissions();
  }

  // right after init build the canvas inn which the picture will be edited
  // canvas is build in function of the image choosed to be in background in order to keep the right dimension of the original image
  ngAfterViewInit() {
    const img = this.loadImage(this.image);
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    const height = (this.plt.width() * img.height) / img.width
    this.canvasElement.height = height + '';
    this.setBackground(img);
  }

  // verify if the application have the permissions to write in the gallery (if not, then ask for it)
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

  // function to show (or hide) the settings for the canvas (color / size of the stroke)
  displaySettings() {
    if (this.settings) {
      this.settings = false;
    } else if (!this.settings) {
      this.settings = true;
    }
  }

  // function to load an image from a string in base64 to a classical image format
  loadImage(image) {
    const img = new Image();
    img.src = image;
    return img;
  }
  
  // function taking in acount an event trigerred on the html page listening for a first touch in the field of the canvas
  // in order to save the position of the first touch in two variables
  startDrawing(ev) {
    this.drawing = true;
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = ev.pageX - canvasPosition.x;
    this.saveY = ev.pageY - canvasPosition.y;
  }

  // function taking an event corresponding to the end of the draw (the finger releasing the screen)
  // allow us to know when the draw should be finished (triggered in the html too)
  endDrawing() {
    this.drawing = false;
  }

  // set the color of the pen to draw to the color choosen by the user
  selectColor(color) {
    this.selectedColor = color;
  }
  // set an image in the backgroung of the canvas
  setBackground(img) {
    const ctx = this.canvasElement.getContext('2d');

    img.onload = () => {
      ctx.drawImage(img,0,0, this.canvasElement.width, this.canvasElement.height);
    };
  }

  // take an event in param allow us to follow the finger moving on the canvas by calculating the difference between
  // the saved position and current position then draw on that pass
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

  // transform the content of the canvas to an url (string in base64) then export it to the gallery
  // with base64ToGallery plugin
  exportEditedImage() {
    const dataUrl = this.canvasElement.toDataURL();
    const options: Base64ToGalleryOptions = { prefix: 'edited_', mediaScanner:  false };
    this.testImage = dataUrl;
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
    this.modalCtrl.dismiss(dataUrl, 'save');
  }

}
