import { Component, OnInit, Input } from '@angular/core';
import { CrowdsourcingService } from 'src/app/providers/crowdsourcing/crowdsourcing.service';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { ModalController, NavParams } from '@ionic/angular';
import { CharacterSheetPage } from '../character-sheet/character-sheet.page';

@Component({
  selector: 'app-crowdsourcing',
  templateUrl: './crowdsourcing.page.html',
  styleUrls: ['./crowdsourcing.page.scss'],
})
export class CrowdsourcingPage implements OnInit {

  @Input()
  importing: boolean;
  characters: CharacterSheet[];
  isModal: boolean;

  constructor(private crowdsourcing: CrowdsourcingService, 
    public modalCtrl: ModalController, private navParams: NavParams) {
    this.characters = [];
    this.isModal = navParams.get('modal');
  }

  ngOnInit() {
    this.crowdsourcing.getCharacterSheets().subscribe(value => {
      this.characters = value;
    });
  }

  displayChar(index: number) {
    this.modalCtrl.create({
      component: CharacterSheetPage,
      componentProps: {
        display: true,
        character: this.characters[index],
        import: this.importing
      }
    }).then(modal => {
      modal.present()
    })
  }

  doRefresh(event) {
    this.crowdsourcing.getCharacterSheets().subscribe(sheets => {
      this.characters = sheets;
      event.detail.complete()
    })
  }

}
