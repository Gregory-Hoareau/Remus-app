import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController, NavParams  } from '@ionic/angular';

@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.page.html',
  styleUrls: ['./host-form.page.scss'],
})
export class HostFormPage implements OnInit {

  myForm : FormGroup;
  @Input() name : string;
  @Input() description : string;


  constructor(private formBuilder: FormBuilder,
     private modalController: ModalController) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: [this.name],
      password: [''],
      description: [this.description]
    })
  }


  async closeModal(onClosedData: any) {
    console.table(onClosedData);
    await this.modalController.dismiss(onClosedData);
  }

  onSubmit() {
    
  }

}
