import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CharacterNameGeneratorPage } from '../character-name-generator/character-name-generator.page';

@Component({
  selector: 'app-generator-choice',
  templateUrl: './generator-choice.page.html',
  styleUrls: ['./generator-choice.page.scss'],
})
export class GeneratorChoicePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  characterNameModal() {
    this.modalController.create({
      component: CharacterNameGeneratorPage
    }).then(m => m.present());
  }

  closeModal() {
    this.modalController.dismiss()
  }

}
