import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCharacterPage } from './select-character.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { all_characters } from 'src/mocks/Character';


describe('SelectCharacterPage', () => {
  let component: SelectCharacterPage;
  let fixture: ComponentFixture<SelectCharacterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCharacterPage ],
      imports: [
        IonicModule.forRoot(),
        FontAwesomeModule
      ],
      providers: [
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an attribute characters', () => {
    expect(component.characters).toBeDefined()
  });

  it('should display nothing if characters is empty', () => {
    const list = fixture.debugElement.query(By.css('.character-list'));
    expect(list.nativeElement.children.length).toBe(0);
  });

  it('should display the charaters', () => {
    component.characters = all_characters;
    fixture.detectChanges()
    const list = fixture.debugElement.query(By.css('.character-list'));
    expect(list.nativeElement.children.length).toBeGreaterThan(0);
  });
  
});
