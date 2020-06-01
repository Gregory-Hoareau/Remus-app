import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RollMacroComponent } from './roll-macro.component';

describe('RollMacroComponent', () => {
  let component: RollMacroComponent;
  let fixture: ComponentFixture<RollMacroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollMacroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RollMacroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
