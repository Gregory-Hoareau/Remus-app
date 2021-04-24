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
  private characters: CharacterSheet[];
  displayedCharacters: CharacterSheet[];
  isModal: boolean;
  selectedFilter = [];
  availableTags = this.crowdsourcing.availableTags;

  constructor(private crowdsourcing: CrowdsourcingService,
    public modalCtrl: ModalController, private navParams: NavParams) {
    this.characters = [];
    this.isModal = navParams.get('modal');
  }

  ngOnInit() {
    this.crowdsourcing.getCharacterSheets().subscribe(value => {
      this.characters = value;
      this.displayedCharacters = this.filterCharacters();
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

  filterCharacters(): CharacterSheet[] {
    let res = [];
    if (this.selectedFilter.length !== 0) {
      this.characters.forEach((sheet) => {
        for (const tag of this.selectedFilter) {
          if (sheet.tags.includes(tag)) {
            res.push(sheet);
            break;
          }
        }
        
      })
    } else {
      res = this.characters;
    }
    
    return res;
  }

  selectFilter(event) {
    //console.log(this.selectedFilter)
    this.displayedCharacters = this.filterCharacters();
  }

  resetFilter() {
    this.selectedFilter = [];
    this.displayedCharacters = this.filterCharacters();
  }

  doRefresh(event) {
    this.crowdsourcing.getCharacterSheets().subscribe(sheets => {
      this.characters = sheets;
      this.displayedCharacters = this.filterCharacters();
      event.detail.complete()
    })
  }

}
