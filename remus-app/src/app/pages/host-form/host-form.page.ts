import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController, NavParams  } from '@ionic/angular';
import { CharacterService } from 'src/app/providers/character/character.service';

@Component({
  selector: 'app-host-form',
  templateUrl: './host-form.page.html',
  styleUrls: ['./host-form.page.scss'],
})
export class HostFormPage implements OnInit {

  myForm : FormGroup;
  @Input() name : string;
  @Input() description : string;
  template:string;


  constructor(private formBuilder: FormBuilder,
     private modalController: ModalController, private characterService: CharacterService) {}

  ngOnInit() {
    this.template = this.characterService.default_template;
    this.myForm = this.formBuilder.group({
      name: [this.name],
      password: [''],
      description: [this.description],
      template: [this.template]
    });
  }


  async closeModal(onClosedData: any) {
    console.table(onClosedData);
    this.characterService.setTemplate(onClosedData.template);
    await this.modalController.dismiss(onClosedData);
  }

  onSubmit() {
    
  }

}
