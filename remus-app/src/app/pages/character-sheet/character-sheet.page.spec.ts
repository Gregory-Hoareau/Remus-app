import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { CharacterSheetPage } from './character-sheet.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CharacterSheetPage', () => {
  let component: CharacterSheetPage;
  let fixture: ComponentFixture<CharacterSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CharacterSheetPage
       ],
      imports: [
        IonicModule.forRoot(),
        MatExpansionModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        HttpClientTestingModule
      ],
      providers: [
        ImagePicker,
        File,
        NavParams,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a character sheet to display', () => {
    expect(component.character).toBeDefined();
  });

  it('should add new skill to the character', ()=> {
    const initial = component.character.skills.length
    component.addSkill({name: 'Competence1'})
    expect(component.character.skills.length).toBe(initial+1);
  });

  it('should delete a skill of the character', ()=> {
    const initial = component.character.skills.length
    component.addSkill({name: 'Competence1'});
    component.deleteSkill(initial);
    expect(component.character.skills.length).toBe(initial);
  });

  it('should change the value of one trait', ()=> {
    const index = 0;
    const initial = component.character.traits[index].value;
    const all_initial_trait = component.character.traits
    const new_val = initial+5;
    component.changeTraitValue(index, new_val);
    expect(component.character.traits[index].value).toBe(new_val);
    for(let i; i < component.character.traits.length; i++) {
      if(index !== i) {
        expect(component.character.traits[i].value).toBe(all_initial_trait[index].value);
      }
    }
  });
  
});
