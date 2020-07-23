import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanvasPage } from 'src/app/pages/canvas/canvas.page';

@Component({
  selector: 'app-shared-file',
  templateUrl: './shared-file.component.html',
  styleUrls: ['./shared-file.component.scss'],
})
export class SharedFileComponent implements OnInit {

  @Input()
  image:string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    var node = document.getElementById("container");
    node.setAttribute("id",this.image);
  }

  closeImage() {
    var node = document.getElementById(this.image);
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }

  openCanvasModal() {
    this.modalController.create({
      component: CanvasPage,
      swipeToClose: true,
      componentProps: {
        image: this.image
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then((data) => {
        this.image = data.data;
      });
    });
  }

}
