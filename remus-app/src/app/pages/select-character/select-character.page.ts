import { Component, OnInit } from '@angular/core';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { CharacterService } from 'src/app/providers/character/character.service';
import { ModalController } from '@ionic/angular';
import { CharacterSheetPage } from '../character-sheet/character-sheet.page';

@Component({
  selector: 'app-select-character',
  templateUrl: './select-character.page.html',
  styleUrls: ['./select-character.page.scss'],
})
export class SelectCharacterPage implements OnInit {

  private characters: CharacterSheet[];

  constructor(private characterService: CharacterService, private modalCtrl:ModalController) {
    this.characters = this.characterService.characters;
    console.log(this.characters)
  }

  ngOnInit() {
  }

  characterModal(index = null) {
    console.log('Select Character: ' + index)
    this.modalCtrl.create({
      component: CharacterSheetPage,
      componentProps: {
        charInd: index,
      }
    }).then(modal => {
      modal.present();
    })
  }
  
  
  
}
