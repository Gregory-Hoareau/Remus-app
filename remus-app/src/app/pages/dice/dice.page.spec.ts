import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DicePage } from './dice.page';

describe('DicePage', () => {
  let component: DicePage;
  let fixture: ComponentFixture<DicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
