import { Injectable } from '@angular/core';
import { all_characters } from 'src/mocks/character'
import {Achivement} from '../../models/achivement.model';

@Injectable({
  providedIn: 'root'
})
export class AchivementService {
  achivements: Achivement[];
  partage:boolean;
  avancee:any;

  constructor() {

    this.achivements = [];
    this.partage = false;
    // tslint:disable-next-line:no-unused-expression
    this.setUpAvancee;
  }
  validAchivement(titre: string) {
    this.achivements.forEach(a => {
      if (a.titre === titre) {
        a.checked = !a.checked;
      }
    });
  }
  remove(achivement: Achivement){
    this.achivements.splice(this.achivements.indexOf(achivement),1);
    this.setUpAvancee();
  }
setUpAvancee(){
  let temp = 0;
  this.achivements.forEach(p => {
  if (p.checked) {
    temp = temp + 1 ;
    }
  });
  if ( this.achivements.length !== 0) {
    this.avancee = ((temp / this.achivements.length));
  } else {
    this.avancee =  1;
  }
}

}
