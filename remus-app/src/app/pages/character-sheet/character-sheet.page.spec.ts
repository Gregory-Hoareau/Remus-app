import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharacterSheetPage } from './character-sheet.page';

describe('CharacterSheetPage', () => {
  let component: CharacterSheetPage;
  let fixture: ComponentFixture<CharacterSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
