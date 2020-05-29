import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCharacterPage } from './select-character.page';

describe('SelectCharacterPage', () => {
  let component: SelectCharacterPage;
  let fixture: ComponentFixture<SelectCharacterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCharacterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
