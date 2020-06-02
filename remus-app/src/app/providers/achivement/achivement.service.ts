import { Injectable } from '@angular/core';
import { all_characters } from 'src/mocks/character'
import {Achivement} from '../../models/achivement.model';

@Injectable({
  providedIn: 'root'
})
export class AchivementService {
  achivements: Achivement[];
  partage:boolean;

  constructor() {

    this.achivements = [];
    this.partage = false;
  }
  validAchivement(titre: string) {
    this.achivements.forEach(a => {
      if (a.titre === titre) {
        a.checked = !a.checked;
      }
    });
  }

}
