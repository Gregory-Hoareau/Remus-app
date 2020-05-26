import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.page.html',
  styleUrls: ['./join-form.page.scss'],
})
export class JoinFormPage implements OnInit {


  myForm: FormGroup;
  @Input() id: string;
  @Input() pseudo: string;


  constructor(private formBuilder: FormBuilder,
              private modalController: ModalController,
              private navParams: NavParams) {}

  ngOnInit() {
    this.id = this.navParams.data.id

    this.myForm = this.formBuilder.group({
      id: [this.id],
      pseudo: [this.pseudo]
    });
  }


  async closeModal(onClosedData: any) {
    console.table(onClosedData);
    await this.modalController.dismiss(onClosedData);
  }

  onSubmit() {

  }

}
