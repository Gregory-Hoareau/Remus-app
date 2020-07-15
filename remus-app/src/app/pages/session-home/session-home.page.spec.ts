import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionHomePage } from './session-home.page';

describe('SessionHomePage', () => {
  let component: SessionHomePage;
  let fixture: ComponentFixture<SessionHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
