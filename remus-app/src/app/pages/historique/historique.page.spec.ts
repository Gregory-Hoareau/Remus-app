import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoriquePage } from './historique.page';

describe('HistoriquePage', () => {
  let component: HistoriquePage;
  let fixture: ComponentFixture<HistoriquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
