import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MacroPage } from './macro.page';

describe('MacroPage', () => {
  let component: MacroPage;
  let fixture: ComponentFixture<MacroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MacroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
