import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DicePage } from './dice.page';
import { FormsModule } from '@angular/forms';

describe('DicePage', () => {
  let component: DicePage;
  let fixture: ComponentFixture<DicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicePage ],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
