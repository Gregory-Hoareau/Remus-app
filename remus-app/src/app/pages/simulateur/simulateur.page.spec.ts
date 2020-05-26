import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulateurPage } from './simulateur.page';

describe('SimulateurPage', () => {
  let component: SimulateurPage;
  let fixture: ComponentFixture<SimulateurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
